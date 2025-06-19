import { Request, Response } from "express";
import { readdirSync } from "fs";
import path from "path";

function fetchDirectorys(): string[][] {
  const shared_directory = readdirSync(path.resolve(__dirname, "./contents/shared_noticeboard"));
  const brampton_directory = readdirSync(path.resolve(__dirname, "./contents/brampton_noticeboard"));
  const moorhouse_directory = readdirSync(path.resolve(__dirname, "./contents/moorhouse_noticeboard"));
  const scotby_directory = readdirSync(path.resolve(__dirname, "./contents/scotby_noticeboard"));
  const shared_map = readdirSync(path.resolve(__dirname, "./contents/shared_map"));
  const brampton_map = readdirSync(path.resolve(__dirname, "./contents/brampton_map"));
  const moorhouse_map = readdirSync(path.resolve(__dirname, "./contents/moorhouse_map"));
  const scotby_map = readdirSync(path.resolve(__dirname, "./contents/scotby_map"));
  
  const directorys: string[][] = [shared_directory, brampton_directory, moorhouse_directory, scotby_directory, shared_map, brampton_map, moorhouse_map, scotby_map];
  return directorys;
}

/// Fetches the local directorys
export function fetchDocuments(req: Request, res: Response) {
  const directorys = fetchDirectorys();

  res.status(200).json(directorys);
}
