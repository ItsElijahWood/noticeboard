import fs from 'fs';
import path from 'path';
import { google, drive_v3 } from 'googleapis';
import type { Auth } from 'googleapis';

async function downloadFile(
  drive: drive_v3.Drive,
  file: drive_v3.Schema$File,
  savePath: string
): Promise<void> {
  const filePath = path.join(savePath, file.name ?? 'unknown');
  const fileStats = fs.existsSync(filePath) ? fs.statSync(filePath) : null;

  if (fileStats && new Date(fileStats.mtime) >= new Date(file.modifiedTime!)) {
    return; 
  }

  const dest = fs.createWriteStream(filePath);
  const res = await drive.files.get(
    { fileId: file.id!, alt: 'media' },
    { responseType: 'stream' }
  );

  await new Promise<void>((resolve, reject) => {
    res.data
      .on('end', () => resolve())
      .on('error', (err) => reject(err))
      .pipe(dest);
  });

  try {
    fs.utimesSync(filePath, new Date().getTime(), new Date(file.modifiedTime!).getTime());
  } catch (e) {
  }
}

async function cleanupLocalFiles(localPath: string, driveFiles: drive_v3.Schema$File[]): Promise<void> {
  const localFiles = fs.readdirSync(localPath);
  const driveFileMap = new Map(driveFiles.map(file => [file.name!, file]));

  for (const file of localFiles) {
    const filePath = path.join(localPath, file);
    const driveFile = driveFileMap.get(file);

    if (!driveFile) {
      fs.rmSync(filePath, { recursive: true, force: true }); // Remove missing files from Google Drive
    } else {
      // Ensure timestamps match before removing outdated files
      const fileStats = fs.statSync(filePath);
      if (new Date(fileStats.mtime) < new Date(driveFile.modifiedTime!)) {
        fs.rmSync(filePath, { recursive: true, force: true });
      }
    }
  }
}

async function syncFolder(drive: drive_v3.Drive, folderId: string, localPath: string): Promise<void> {
  fs.mkdirSync(localPath, { recursive: true });

  const res = await drive.files.list({
    q: `'${folderId}' in parents and trashed = false`,
    fields: 'files(id, name, mimeType, modifiedTime)',
  });

  const files = res.data.files ?? [];
  await cleanupLocalFiles(localPath, files);

  for (const file of files) {
    const filePath = path.join(localPath, file.name ?? 'unknown');

    if (file.mimeType === 'application/vnd.google-apps.folder') {
      await syncFolder(drive, file.id!, filePath);
    } else {
      await downloadFile(drive, file, localPath);
    }
  }
}

export async function connGoogleApi(): Promise<void> {
  const contents = path.resolve(__dirname, './contents');
  if (!fs.existsSync(contents)) {
    fs.mkdirSync(contents, { recursive: true });
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: path.resolve(__dirname, './env/noticeboard-drive-api-241da4909940.json'),
    scopes: ['https://www.googleapis.com/auth/drive'],
  });

  try {
    const authClient = await auth.getClient();
    const drive = google.drive({ version: 'v3', auth: authClient as Auth.OAuth2Client });

    const folderId = '1QPtv_3td6uUNac3rBdM5d4O3plwCjBxE';
    const res = await drive.files.list({
      q: `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name)',
    });

    const folders = res.data.files ?? [];

    for (const folder of folders) {
      if (!folder.id || !folder.name) continue;
      const savePath = path.join(__dirname, 'contents', folder.name);
      await syncFolder(drive, folder.id, savePath);
    }
  } catch (err) {
    console.error('Failed to connect to Google API:', err);
  }
}