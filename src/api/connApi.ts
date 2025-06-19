import fs from 'fs';
import path from 'path';
import { google, drive_v3 } from 'googleapis';
import type { Auth } from 'googleapis';

/// Downloads a file from Google drive
async function downloadFile(
  drive: drive_v3.Drive,
  file: drive_v3.Schema$File,
  savePath: string
): Promise<void> {
  const filePath = path.join(savePath, file.name ?? 'unknown');
  const fileStats = fs.existsSync(filePath) ? fs.statSync(filePath) : null;

  // If the local file is older than 
  // The one on Google drive, it will overwrite
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

/// Deletes or overwrites files and folders
/// to match the latest version in Google drive
async function cleanupLocalFiles(localPath: string, driveFiles: drive_v3.Schema$File[]): Promise<void> {
  const localFiles = fs.readdirSync(localPath);
  const driveFileMap = new Map(driveFiles.map(file => [file.name!, file]));

  // Loops through an array of files and folders
  for (const file of localFiles) {
    const filePath = path.join(localPath, file);
    const driveFile = driveFileMap.get(file);

    // Deletes if not on Google drive
    // Otherwise if the local file is older 
    // than the one on the drive, it will overwrite
    if (!driveFile) {
      fs.rmSync(filePath, { recursive: true, force: true });
    } else {
      const fileStats = fs.statSync(filePath);
      if (new Date(fileStats.mtime) < new Date(driveFile.modifiedTime!)) {
        fs.rmSync(filePath, { recursive: true, force: true });
      }
    }
  }
}

/// Downloads a folder from Google drive
async function syncFolder(drive: drive_v3.Drive, folderId: string, localPath: string): Promise<void> {
  fs.mkdirSync(localPath, { recursive: true });

  // Lists all files and folders
  const res = await drive.files.list({
    q: `'${folderId}' in parents and trashed = false`,
    fields: 'files(id, name, mimeType, modifiedTime)',
  });

  const files = res.data.files ?? [];
  await cleanupLocalFiles(localPath, files);

  // Loops through an array of files and folders
  for (const file of files) {
    const filePath = path.join(localPath, file.name ?? 'unknown');

    // Checks if its a file or folder 
    if (file.mimeType === 'application/vnd.google-apps.folder') {
      await syncFolder(drive, file.id!, filePath);
    } else {
      await downloadFile(drive, file, localPath);
    }
  }
}

/// Connects to Google's api
/// and downloads latest files and folders
export async function connGoogleApi(): Promise<void> {
  const contents = path.resolve(__dirname, './contents');

  // Check if contents folder exists
  if (!fs.existsSync(contents)) {
    fs.mkdirSync(contents, { recursive: true });
  }

  // Creates a new googleAuth using json token
  const auth = new google.auth.GoogleAuth({
    keyFile: path.resolve(__dirname, './env/noticeboard-drive-api.json'),
    scopes: ['https://www.googleapis.com/auth/drive'],
  });

  try {

    // Connects to Google drive
    const authClient = await auth.getClient();
    const drive = google.drive({ version: 'v3', auth: authClient as Auth.OAuth2Client });

    // Lists all folders inside the folderId
    const folderId = '1QPtv_3td6uUNac3rBdM5d4O3plwCjBxE';
    const res = await drive.files.list({
      q: `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name)',
    });

    const folders = res.data.files ?? [];

    // Loops through an array of folders
    // passes to function to download
    for (const folder of folders) {
      if (!folder.id || !folder.name) continue;

      const savePath = path.join(__dirname, 'contents', folder.name);
      await syncFolder(drive, folder.id, savePath);
    }
  } catch (err) {
    console.error('Failed to connect to Google API:', err);
  }
}