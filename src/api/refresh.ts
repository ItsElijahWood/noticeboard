import { Request, Response } from "express";
import { connGoogleApi } from "./connApi";

/// Connects to Google api
export async function refreshNoticeBoard(req: Request, res: Response) {
  await connGoogleApi();

  res.status(200).json({ "ok": "Refreshed noticeboard successfully." });
}