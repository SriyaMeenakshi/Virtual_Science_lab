# 🏗️ Project Architecture & Technical Flow

This document details the high-level architecture, module distribution, and state flow of the **Virtual Science Lab** application. It serves as a guide for developers to understand how the **React + Three.js** frontend interacts with the **Python + FastAPI** backend computational layers.

---

## 🗺️ System Overview

The application is split into two completely decoupled service layers communicating over a RESTful API:

1. **Frontend (Client Layer):** Handles user interactions, 2D dashboard control panel states using Tailwind CSS, and renders real-time, interactive 3D simulations using Three.js inside a React runtime.
2. **Backend (Server Layer):** Processes computational logic, handles complex physics/chemistry formulas, tracks experiment steps, and logs student manual data.

### 🔄 High-Level Data Flow

```text
       ┌─────────────────────────────────────────────────────────┐
       │                 FRONTEND (React Client)                │
       │                                                         │
       │   ┌────────────────────┐       ┌────────────────────┐   │
       │   │   Tailwind UI      │       │     Three.js       │   │
       │   │ (Controls & Forms) │       │ (3D Canvas View)   │   │
       │   └─────────┬──────────┘       └─────────▲──────────┘   │
       └─────────────┼────────────────────────────┼──────────────┘
                     │                            │
                     │ State Updates & Parameters │ Synchronized Anim Loop
                     ▼                            │
       ┌──────────────────────────────────────────┴──────────────┐
       │                   API CLIENT MODULE                     │
       │        Handles HTTP Requests (Fetch / Axios)            │
       └─────────────────────────────┬───────────────────────────┘
                                     │
                                     │ HTTP REST Requests (JSON)
                                     ▼
       ┌─────────────────────────────────────────────────────────┐
       │                 BACKEND (FastAPI Server)                │
       │                                                         │
       │   ┌────────────────────┐       ┌────────────────────┐   │
       │   │  Routers & Endpoints│       │ Calculation Engine │   │
       │   │ (/api/v1/...)      │──────►│ (Physics Modules)  │   │
       │   └────────────────────┘       └────────────────────┘   │
       └─────────────────────────────────────────────────────────┘