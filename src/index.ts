import { Express } from "express";
import express from "express";
import { route } from "./routes/route";
import cors from "cors";

const port: number = 3001;
const app: Express = express();

// Parses json req's + cross origin resource sharing
app.use(cors());
app.use(express.json());

// Import routes
route(app);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
