
# HR Management System

A modern, full-stack web application for managing recruitment workflows and candidate pipelines. Built with React, FastAPI, and Docker for seamless deployment.

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Features](#features)

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
- **npm**: Latest 
- **Python**: 3.10 or later
- **pip**: Latest 

### Installation & Setup


#### Frontend Setup

```bash
cd HR_System
npm install
npm run dev
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
