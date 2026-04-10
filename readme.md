# ZelroTech HR System (End-to-End)

Full-stack HR recruitment management system with:
- React + Vite frontend
- FastAPI backend
- In-memory seeded data for positions and candidates

This project supports role-based candidate tracking across stages:
- Applying Period
- Screening
- Interview
- Test

## 1. Project Overview

The application helps HR teams:
- Manage open positions
- Track candidates in a Kanban pipeline
- Edit candidate details and stage
- View candidate directory with filters
- Use calendar and settings views

### About This Project

This project is an HR recruitment workspace built to manage the full hiring flow from one screen.
It combines job positions, candidate pipelines, candidate profiles, calendar planning, and appearance settings in a single interface.

The main idea is simple:
- positions define what roles are open
- candidates move through hiring stages
- the UI helps recruiters see progress and update data quickly
- the backend stores the data and serves it to the frontend

Authentication in frontend is demo-only:
- Username: `Admin`
- Password: `Admin123`

### Main User Flows

- Open Dashboard to review one position at a time
- Use the position dropdown to switch between Research and Development Officer, Frontend Engineer, and Product Manager
- Drag candidates across the pipeline stages
- Open a candidate card to edit profile details
- Move to Candidate tab to search and manage the full candidate list
- Use Home tab to manage positions and their requirements
- Use Settings tab to change appearance or read project information

## 2. Architecture

### Frontend
- Framework: React 19
- Build tool: Vite 8
- Styling: plain CSS
- State: React hooks
- API access: `fetch` through service layer

### Backend
- Framework: FastAPI
- Server: Uvicorn
- Storage: in-memory Python lists (seeded on startup)
- API base path: `/api`

### Communication
- Frontend calls `/api/*`
- In development, Vite proxies `/api` to `http://127.0.0.1:8000`

## 3. Repository Structure

```text
ZelroTech/
	readme.md
	Backend/
		main.py
		requirements.txt
		run.sh
		app/
			models.py
			seed_data.py
			store.py
	HR_System/
		package.json
		vite.config.js
		src/
			App.jsx
			services/
				apiClient.js
				candidateApi.js
				positionApi.js
```

## 4. Backend Technical Details

### API Endpoints

Health:
- `GET /api/health`

Positions:
- `GET /api/positions`
- `POST /api/positions`
- `PUT /api/positions/{position_id}`
- `DELETE /api/positions/{position_id}`

Candidates:
- `GET /api/candidates`
- `GET /api/candidates/{candidate_id}`
- `POST /api/candidates`
- `PUT /api/candidates/{candidate_id}`
- `PATCH /api/candidates/{candidate_id}/stage`
- `DELETE /api/candidates/{candidate_id}`

### Data Behavior
- Seed data is loaded from `Backend/app/seed_data.py`
- Data is stored in memory using `Backend/app/store.py`
- Restarting backend resets data to seed defaults

## 5. Frontend Technical Details

### Frontend Service Layer
- `src/services/apiClient.js`: shared HTTP request helper
- `src/services/candidateApi.js`: candidate endpoints
- `src/services/positionApi.js`: position endpoints

### Important Config
- `HR_System/vite.config.js` contains dev proxy:
	- `/api` -> `http://127.0.0.1:8000`

## 5.1 Feature Guide

### Dashboard
- Shows the recruitment pipeline for one selected position
- The position dropdown changes which role is shown in the board
- Available positions are loaded from the backend
- Candidate cards can be dragged between stages
- The board updates stage automatically after a move
- The header summary changes with the selected role

### Candidate Directory
- Shows all candidates in a searchable list
- Supports filtering by stage and position
- Lets you open a candidate profile for editing
- Copy buttons let you copy phone number or email quickly
- Delete removes a candidate from the backend dataset

### Candidate Modal
- Edit name, email, phone, location, role, stage, referral, and assessment status
- Press `Esc` to close the modal quickly
- Save changes are sent to the backend API

### Home / Positions
- View all positions
- Create a new position
- Edit position name, deadline, requirements, nice-to-have items, work description, and location type
- Delete a position and automatically reassign candidates if needed

### Calendar
- Switch between month, week, and year views
- Used for planning recruitment activity

### Settings
- General section changes the appearance mode
- About section explains the project features
- Appearance supports `System`, `Dark`, and `Light`

### Backend Data Ownership
- Candidate data lives in the FastAPI backend
- Position data lives in the FastAPI backend
- Frontend only requests and displays data
- Seed data is loaded when backend starts

## 6. Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm
- Python 3.10+
- pip

## 7. How To Run (End-to-End)

Open two terminals.

### Terminal 1: Backend

```bash
cd Backend
python -m pip install -r requirements.txt
./run.sh
```

Backend runs on:
- `http://127.0.0.1:8000`

### Terminal 2: Frontend

```bash
cd HR_System
npm install
npm run dev
```

Frontend runs on:
- `http://localhost:5173`

## 8. Build And Lint

Frontend:

```bash
cd HR_System
npm run lint
npm run build
```

Backend quick syntax check:

```bash
cd Backend
python -m py_compile main.py app/models.py app/store.py app/seed_data.py
```

## 9. Common Issues

### Dummy data not visible
Check:
1. Backend is running on port 8000
2. Frontend is running with `npm run dev` (not `npm run build`)
3. You opened `http://localhost:5173`

### Wrong frontend command
- Correct: `npm run dev`
- Wrong: `npm run deb` or `npm run drv`

### API errors in UI
If backend is stopped, frontend cannot load data because data is backend-owned now.

## 10. Notes

- This is currently an in-memory backend (no database persistence).
- Next upgrade path: add SQLite/PostgreSQL with SQLAlchemy and Alembic migrations.

## 11. Detailed About Summary

If you want the short version of what this app does:
- It is a recruitment dashboard for HR teams.
- It helps manage jobs and applicants together.
- It shows candidates by position and hiring stage.
- It supports quick editing without leaving the dashboard.
- It keeps backend data separated from the frontend UI.