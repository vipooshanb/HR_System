---
title: ZelroTech HR Management System
emoji: 👥
colorFrom: blue
colorTo: indigo
sdk: docker
pinned: false
---

# ZelroTech HR Management System

A modern, full-stack web application for managing recruitment workflows and candidate pipelines. Built with React, FastAPI, and Docker for seamless deployment.

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Features](#features)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## Overview

ZelroTech HR System is a comprehensive recruitment management platform designed to streamline the hiring workflow. It provides HR teams with real-time visibility into candidate pipelines, enabling efficient tracking and management across multiple positions and recruitment stages.

### Key Capabilities

- **Position Management**: Create and manage job openings with detailed requirements and specifications
- **Candidate Pipeline**: Track candidates through hiring stages (Applying Period → Screening → Interview → Test)
- **Kanban Board**: Visualize candidate progression with drag-and-drop functionality
- **Candidate Directory**: Search and filter candidates across all positions
- **Calendar Planning**: Schedule and plan recruitment activities
- **Responsive Design**: Optimized for desktop and mobile devices with dark mode as default

### Demo Credentials

```
Username: Admin
Password: Admin123
```

---

## Technology Stack

### Frontend
| Component | Technology | Version |
|-----------|-----------|---------|
| Framework | React | 19.2.4 |
| Build Tool | Vite | 8.0.4 |
| Styling | Plain CSS | - |
| State Management | React Hooks | Built-in |
| Linting | ESLint | 9.39.4 |

### Backend
| Component | Technology | Version |
|-----------|-----------|---------|
| Framework | FastAPI | ≥0.115 |
| Server | Uvicorn | ≥0.30 |
| Storage | In-Memory (Seeded) | - |
| API Protocol | REST | JSON |

### Deployment
| Component | Technology |
|-----------|-----------|
| Containerization | Docker | 
| Container Runtime | Docker Engine |
| Cloud Platform | Hugging Face Spaces |

---

## System Architecture

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Layer (Browser)                    │
│  React 19 + Vite 8 | CSS | Service Layer (fetch API)        │
└────────────────────────────┬────────────────────────────────┘
                             │
                    HTTP REST API (/api/*)
                             │
┌────────────────────────────▼────────────────────────────────┐
│                    Application Layer                         │
│  FastAPI + Uvicorn | Pydantic Validation | CORS Middleware  │
├─────────────────────────────────────────────────────────────┤
│              11 RESTful Endpoints (Positions & Candidates)   │
└────────────────────────────┬────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────┐
│                    Data Layer                                │
│  In-Memory Storage (Python Lists) | Thread-Safe (Locks)     │
│  Seed Data: 3 Positions, 19 Candidates (Seeded on Start)    │
└─────────────────────────────────────────────────────────────┘
```

### Communication Flow

1. **Development**: Frontend proxies `/api` requests to `http://127.0.0.1:8000` via Vite dev server
2. **Production**: Frontend and backend are bundled together in Docker container, served on single port (7860)

### Data Flow

- Frontend initiates HTTP requests through service layer (`services/apiClient.js`)
- Backend validates requests using Pydantic models
- Data is retrieved/modified from in-memory store (`app/store.py`)
- Responses are returned as JSON (Pydantic-serialized)

---

## Project Structure

```
ZelroTech/
├── Backend/                           # FastAPI application
│   ├── main.py                       # Application entry point & route definitions
│   ├── requirements.txt               # Python dependencies
│   ├── run.sh                         # Start script
│   └── app/
│       ├── models.py                  # Pydantic schemas for request/response
│       ├── store.py                   # In-memory data storage & thread safety
│       └── seed_data.py               # Initial dataset (3 positions, 19 candidates)
│
├── HR_System/                         # React + Vite application
│   ├── package.json                   # Node dependencies
│   ├── vite.config.js                 # Vite configuration (dev proxy)
│   ├── index.html                     # HTML entry point
│   └── src/
│       ├── App.jsx                    # Root component & view orchestration
│       ├── index.css                  # Global styles
│       ├── components/
│       │   ├── Dashboard/             # Kanban board for candidate pipeline
│       │   ├── CandidateDirectory/    # Searchable candidate list
│       │   ├── CandidateModal/        # Candidate edit modal
│       │   ├── HomeView/              # Position management
│       │   ├── CalendarView/          # Recruitment calendar
│       │   ├── SettingsPanel/         # Theme & settings
│       │   └── ... (other components)
│       ├── services/
│       │   ├── apiClient.js           # HTTP client wrapper
│       │   ├── candidateApi.js        # Candidate API calls
│       │   └── positionApi.js         # Position API calls
│       └── constants/
│           └── stageOrder.js          # Pipeline stages constant
│
├── Dockerfile                         # Multi-stage Docker build
├── .dockerignore                      # Docker build exclusions
├── .gitignore                         # Git exclusions
└── readme.md                          # This file
```

---

## Getting Started

### Prerequisites

- **Node.js**: 18 LTS or later
- **npm**: Latest (installed with Node.js)
- **Python**: 3.10 or later
- **pip**: Latest (Python package manager)

### Installation & Setup

#### 1. Clone Repository

```bash
git clone https://github.com/vipooshanb/HR_System.git
cd HR_System
```

#### 2. Backend Setup (Terminal 1)

```bash
cd Backend
pip install -r requirements.txt
./run.sh
```

The backend will start on `http://127.0.0.1:8000`

**Verify**:
```bash
curl http://127.0.0.1:8000/api/health
# Expected response: {"status":"ok"}
```

#### 3. Frontend Setup (Terminal 2)

```bash
cd HR_System
npm install
npm run dev
```

The frontend will start on `http://localhost:5173`

**Open Browser**: Visit `http://localhost:5173` and login with demo credentials

---

## API Documentation

### Base URL

- **Development**: `http://127.0.0.1:8000/api`
- **Production**: `/api`

### Authentication

Currently using front-end only demo authentication (no backend token validation).

### Endpoints

#### Health Check

```http
GET /api/health
```

**Response**: `{"status": "ok"}`

---

#### Positions

##### List All Positions

```http
GET /api/positions
```

**Response** (200 OK):
```json
[
  {
    "id": "pos-abc123",
    "name": "Senior Frontend Engineer",
    "requirements": ["React", "TypeScript", "CSS"],
    "niceToHave": ["Next.js", "Testing"],
    "deadline": "2024-12-31",
    "aboutWork": "Build modern web applications",
    "locationType": "Remote"
  }
]
```

##### Create Position

```http
POST /api/positions
Content-Type: application/json

{
  "name": "Backend Engineer",
  "requirements": ["Python", "FastAPI"],
  "niceToHave": ["Docker"],
  "deadline": "2024-12-31",
  "aboutWork": "Develop scalable APIs",
  "locationType": "Hybrid"
}
```

**Response** (201 Created): Position object

##### Update Position

```http
PUT /api/positions/{position_id}
Content-Type: application/json

{
  "name": "Lead Backend Engineer",
  "deadline": "2025-01-15"
}
```

**Response** (200 OK): Updated position object

##### Delete Position

```http
DELETE /api/positions/{position_id}
```

**Response** (204 No Content)

---

#### Candidates

##### List All Candidates

```http
GET /api/candidates
```

**Response** (200 OK): Array of candidate objects

##### Get Candidate Details

```http
GET /api/candidates/{candidate_id}
```

**Response** (200 OK): Candidate object

##### Create Candidate

```http
POST /api/candidates
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1-234-567-8900",
  "role": "Frontend Engineer",
  "appliedPosition": "Senior Frontend Engineer",
  "stage": "Applying Period",
  "applicationDate": "2024-10-15",
  "location": "San Francisco",
  "notes": "Strong React experience"
}
```

**Response** (201 Created): Created candidate object

##### Update Candidate

```http
PUT /api/candidates/{candidate_id}
Content-Type: application/json

{
  "stage": "Screening",
  "notes": "Initial screening passed"
}
```

**Response** (200 OK): Updated candidate object

##### Update Candidate Stage

```http
PATCH /api/candidates/{candidate_id}/stage
Content-Type: application/json

{
  "stage": "Interview"
}
```

**Response** (200 OK): Updated candidate object

##### Delete Candidate

```http
DELETE /api/candidates/{candidate_id}
```

**Response** (204 No Content)

---

## Features

### Dashboard
- **Position Filter**: Dropdown to switch between open positions
- **Kanban Board**: Visual pipeline with 4 columns (Applying Period, Screening, Interview, Test)
- **Drag & Drop**: Move candidates between stages
- **Real-time Summary**: Active candidate count per position
- **Responsive**: Stacks to single column on mobile

### Candidate Directory
- **Global Search**: Search by name, email, phone, or position
- **Multi-Filter**: Advanced filtering by stage and position simultaneously
- **Batch Operations**: Bulk actions on candidate records
- **Quick Copy**: One-click copy for contact information
- **Inline Delete**: Remove candidates from database

### Position Management
- **CRUD Operations**: Create, read, update, delete positions
- **Detailed Requirements**: Specify requirements and nice-to-have skills
- **Deadline Tracking**: Set and track application deadlines
- **Auto-Reassignment**: Automatic fallback when position is deleted

### Candidate Modal
- **Full Profile Editing**: Complete candidate information management
- **Stage Transitions**: Move candidates through pipeline stages
- **Assessment Tracking**: Mark assessment completion status
- **Referral Tracking**: Record internal referrals
- **Quick Close**: Press ESC to close modal

### Calendar
- **Multiple Views**: Month, week, and year views
- **Event Planning**: Organize recruitment activities and interviews
- **Date Navigation**: Intuitive calendar controls

### Settings
- **Theme Management**: Switch between Light, Dark, and System theme
- **Persistent Preferences**: Save theme choice to localStorage
- **Project Information**: View feature guide and project details

---

## Deployment

### Local Development Server

Ensure backend and frontend are running as per [Getting Started](#getting-started).

### Docker Build

```bash
docker build -t zelrotech-hr .
```

This command:
1. Builds React frontend (`npm run build`)
2. Copies dist files to backend's static directory
3. Creates production image with FastAPI server

### Docker Run (Local Testing)

```bash
docker run -p 7860:7860 zelrotech-hr
```

Access application at `http://localhost:7860`

### Hugging Face Spaces Deployment

1. **Create Space**
   - Visit [Hugging Face Spaces](https://huggingface.co/spaces)
   - Click "Create new Space"
   - Select **Docker** as SDK

2. **Push Repository**
   ```bash
   git remote add huggingface https://huggingface.co/spaces/your-username/HR_System
   git push huggingface main
   ```

3. **Auto-Deploy**
   - Hugging Face automatically builds from Dockerfile
   - App runs on Hugging Face's servers
   - Access via unique Space URL

---

## Troubleshooting

### Frontend Cannot Connect to Backend

**Symptoms**: "Failed to load backend data" error in UI

**Solutions**:
1. Verify backend is running: `curl http://127.0.0.1:8000/api/health`
2. Check Vite dev server is running (`npm run dev`, not `npm run build`)
3. Verify port 8000 is not blocked by firewall
4. Check vite.config.js proxy configuration

### Candidate Data Not Appearing

**Symptoms**: Empty Kanban board or candidate list

**Solutions**:
1. Verify `app/seed_data.py` contains candidate records
2. Check backend logs for errors
3. Restart backend server (data reloads from seed)
4. Try accessing `/api/candidates` directly in browser

### Port Already in Use

**Error**: `Address already in use`

**Solutions**:
```bash
# Find process on port 8000 (backend)
lsof -ti:8000 | xargs kill -9

# Find process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

### Build Failures

**Frontend Build Error**:
```bash
cd HR_System
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Backend Import Error**:
```bash
cd Backend
pip install --upgrade pip
pip install -r requirements.txt
```

---

## Technical Notes

### Data Storage

- **Type**: In-memory Python lists with thread-safety locks
- **Persistence**: None (resets on server restart)
- **Seeding**: Initial data loaded from `app/seed_data.py`
- **Future Enhancement**: Add SQLite/PostgreSQL persistence layer

### Performance Considerations

- Seeded dataset: 3 positions, 19 candidates (performant)
- No database indexes (in-memory only)
- Suitable for teams up to ~100 candidates
- Production deployment should add persistent database

### Security

**Note**: This is a demo application. For production use:
- Implement proper authentication (JWT tokens)
- Add rate limiting
- Enable HTTPS
- Validate all inputs rigorously
- Implement role-based access control (RBAC)

---

## Support & Contribution

For issues, feature requests, or contributions, please contact the development team.

---

**Version**: 1.0.0  
**Last Updated**: April 2026  
**License**: Proprietary  
**Status**: Production-Ready