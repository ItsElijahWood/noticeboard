# Digital Noticeboard

A modern **Digital Noticeboard** built with **React**, **JavaScript**, and **TypeScript**. It connects to **Google Drive** to fetch and display documents.

---

## Project Structure

This repository uses a multi-branch setup:

- `master` – Contains the **frontend application** (React)
- `backend` – Contains the **backend service** (Node.js & TypeScript)

---

## Documentation

### API Endpoints

| Method | Endpoint          | Description                                                |
|--------|-------------------|------------------------------------------------------------|
| GET    | `/api/refresh`    | Connects to Google Drive and downloads the latest files   |
| POST    | `/api/documents`  | Returns a list of local documents ready to be displayed   |

---

## Backend Files

| File         | Purpose                                                       |
|--------------|---------------------------------------------------------------|
| `index.ts`   | Entry point for the backend server                            |
| `route.ts`   | Defines API routes                                            |
| `connApi.ts` | Handles Google Drive file downloads                           |
| `documents.ts` | Reads local directory and returns file name             |
| `refresh.ts` | References `connApi.ts` and sends an HTTP response               |

---

## Env & Authentication

Make sure to include the following file for Google Drive authentication:

- `noticeboard-drive-api.json` – Contains the credentials for accessing Google Drive via the API.

---

## Setup

### 1. Download everything required 

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

### 2. Clone the Repository

```bash
# Create the project directory
sudo apt install npm

mkdir noticeboard
cd noticeboard

# Clone the frontend (master branch)
git clone https://github.com/itselijahwood/noticeboard.git ./noticeboard

# Clone the backend (backend branch)
git clone -b backend https://github.com/itselijahwood/noticeboard.git ./backend
```

### 3. Start the frontend and backend

Run the backend first
```bash 
cd ./backend
npm i
npm run start
```

Run the frontend
```bash
cd ./noticeboard
npm i
npm run start
```