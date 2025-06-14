import { Express } from "express";
import { refreshNoticeBoard } from "../api/refresh";
import { fetchDocuments } from "../api/documents";
import path from "path";
import fs from "fs";

/**
 * Manages API routes
 * 
 * @param app jsonwebtoken.Express
 */
export function route(app: Express) {
  app.get('/api/refresh', refreshNoticeBoard);
  app.post('/api/documents', fetchDocuments);

  // Fetching documents
  app.post(`/api/contents/shared_noticeboard`, (req, res) => {
    const { file_name } = req.body;

    const url = path.resolve(__dirname, `../api/contents/shared_noticeboard/${file_name}`);

    if (fs.existsSync(url)) {
      const fileUrl = `http://localhost:3001/api/contents/shared_noticeboard/${encodeURIComponent(file_name)}`;
      res.status(200).json({ url: fileUrl });
    } else {
      res.status(404).json({ 404: "File not found." });
    }
  });
  
  app.get('/api/contents/shared_noticeboard/:file_name', (req, res) => {
    const { file_name } = req.params;
    
    const filePath = path.resolve(__dirname, `../api/contents/shared_noticeboard/${file_name}`);

    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({ 404: "File not found." });
    }
  });

  app.post(`/api/contents/brampton_noticeboard`, (req, res) => {
    const { file_name } = req.body;

    const url = path.resolve(__dirname, `../api/contents/brampton_noticeboard/${file_name}`);

    if (fs.existsSync(url)) {
      const fileUrl = `http://localhost:3001/api/contents/brampton_noticeboard/${encodeURIComponent(file_name)}`;
      res.status(200).json({ url: fileUrl });
    } else {
      res.status(404).json({ 404: "File not found." });
    }
  });
  
  app.get('/api/contents/brampton_noticeboard/:file_name', (req, res) => {
    const { file_name } = req.params;
    
    const filePath = path.resolve(__dirname, `../api/contents/brampton_noticeboard/${file_name}`);

    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({ 404: "File not found." });
    }
  });

  app.post(`/api/contents/scotby_noticeboard`, (req, res) => {
    const { file_name } = req.body;

    const url = path.resolve(__dirname, `../api/contents/scotby_noticeboard/${file_name}`);

    if (fs.existsSync(url)) {
      const fileUrl = `http://localhost:3001/api/contents/scotby_noticeboard/${encodeURIComponent(file_name)}`;
      res.status(200).json({ url: fileUrl });
    } else {
      res.status(404).json({ 404: "File not found." });
    }
  });
  
  app.get('/api/contents/scotby_noticeboard/:file_name', (req, res) => {
    const { file_name } = req.params;
    
    const filePath = path.resolve(__dirname, `../api/contents/scotby_noticeboard/${file_name}`);

    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({ 404: "File not found." });
    }
  });

  app.post(`/api/contents/moorhouse_noticeboard`, (req, res) => {
    const { file_name } = req.body;

    const url = path.resolve(__dirname, `../api/contents/moorhouse_noticeboard/${file_name}`);

    if (fs.existsSync(url)) {
      const fileUrl = `http://localhost:3001/api/contents/moorhouse_noticeboard/${encodeURIComponent(file_name)}`;
      res.status(200).json({ url: fileUrl });
    } else {
      res.status(404).json({ 404: "File not found." });
    }
  });
  
  app.get('/api/contents/moorhouse_noticeboard/:file_name', (req, res) => {
    const { file_name } = req.params;
    
    const filePath = path.resolve(__dirname, `../api/contents/moorhouse_noticeboard/${file_name}`);

    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({ 404: "File not found." });
    }
  });

  // Fetching maps
  app.post(`/api/contents/shared_map`, (req, res) => {
    const { file_name } = req.body;

    const url = path.resolve(__dirname, `../api/contents/shared_map/${file_name}`);

    if (fs.existsSync(url)) {
      const fileUrl = `http://localhost:3001/api/contents/shared_map/${encodeURIComponent(file_name)}`;
      res.status(200).json({ url: fileUrl });
    } else {
      res.status(404).json({ 404: "File not found." });
    }
  });
  
  app.get('/api/contents/shared_map/:file_name', (req, res) => {
    const { file_name } = req.params;
    
    const filePath = path.resolve(__dirname, `../api/contents/shared_map/${file_name}`);

    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({ 404: "File not found." });
    }
  });

  app.post(`/api/contents/brampton_map`, (req, res) => {
    const { file_name } = req.body;

    const url = path.resolve(__dirname, `../api/contents/brampton_map/${file_name}`);

    if (fs.existsSync(url)) {
      const fileUrl = `http://localhost:3001/api/contents/brampton_map/${encodeURIComponent(file_name)}`;
      res.status(200).json({ url: fileUrl });
    } else {
      res.status(404).json({ 404: "File not found." });
    }
  });
  
  app.get('/api/contents/brampton_map/:file_name', (req, res) => {
    const { file_name } = req.params;
    
    const filePath = path.resolve(__dirname, `../api/contents/brampton_map/${file_name}`);

    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({ 404: "File not found." });
    }
  });

  app.post(`/api/contents/scotby_map`, (req, res) => {
    const { file_name } = req.body;

    const url = path.resolve(__dirname, `../api/contents/scotby_map/${file_name}`);

    if (fs.existsSync(url)) {
      const fileUrl = `http://localhost:3001/api/contents/scotby_map/${encodeURIComponent(file_name)}`;
      res.status(200).json({ url: fileUrl });
    } else {
      res.status(404).json({ 404: "File not found." });
    }
  });
  
  app.get('/api/contents/scotby_map/:file_name', (req, res) => {
    const { file_name } = req.params;
    
    const filePath = path.resolve(__dirname, `../api/contents/scotby_map/${file_name}`);

    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({ 404: "File not found." });
    }
  });

  app.post(`/api/contents/moorhouse_map`, (req, res) => {
    const { file_name } = req.body;

    const url = path.resolve(__dirname, `../api/contents/moorhouse_map/${file_name}`);

    if (fs.existsSync(url)) {
      const fileUrl = `http://localhost:3001/api/contents/moorhouse_map/${encodeURIComponent(file_name)}`;
      res.status(200).json({ url: fileUrl });
    } else {
      res.status(404).json({ 404: "File not found." });
    }
  });
  
  app.get('/api/contents/moorhouse_map/:file_name', (req, res) => {
    const { file_name } = req.params;
    
    const filePath = path.resolve(__dirname, `../api/contents/moorhouse_map/${file_name}`);

    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({ 404: "File not found." });
    }
  });
}
