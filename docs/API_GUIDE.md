# 🚀 FastAPI Backend API Documentation

This guide provides a comprehensive reference for the current FastAPI backend routes available in the `backend/` directory of the **Virtual Science Lab** project. 

The backend acts as the core calculation and reporting engine, serving endpoints to the React + Three.js frontend.

---

## 🛠️ Interactive Documentation (Swagger UI)
When running the backend server locally (`uvicorn main:app --reload`), you can view and test these endpoints interactively via the built-in documentation interfaces:
* **Swagger UI:** `http://127.0.0.1:8000/docs`
* **ReDoc:** `http://127.0.0.1:8000/redoc`

---

## 🛣️ API Endpoints Reference

### 1. Base Health Check
Verifies that the FastAPI server is running properly and connected.
* **URL:** `/`
* **Method:** `GET`
* **Headers:** `Content-Type: application/json`
* **Response (200 OK):**
    ```json
    {
      "status": "healthy",
      "message": "Virtual Science Lab Backend API is operational"
    }
    ```

---

### 2. Experiment Calculations Engine
Processes physics and chemistry simulation metrics sent by the frontend, runs specific logic formulas, and returns data points.
* **URL:** `/api/v1/experiments/calculate`
* **Method:** `POST`
* **Headers:** `Content-Type: application/json`
* **Request Body JSON Example:**
    ```json
    {
      "experiment_type": "pendulum",
      "parameters": {
        "length": 2.5,
        "gravity": 9.81
      }
    }
    ```
* **Response (200 OK):**
    ```json
    {
      "success": true,
      "experiment_type": "pendulum",
      "calculated_result": {
        "time_period_seconds": 3.17,
        "frequency_hz": 0.315
      }
    }
    ```
* **Error Response (400 Bad Request):**
    ```json
    {
      "detail": "Invalid parameters passed for experiment type: pendulum"
    }
    ```

---

### 3. Lab Reporting & Result Logging
Receives experimental observation data points inputted by the user in the frontend, processing them for storage or future file generation.
* **URL:** `/api/v1/reports/log`
* **Method:** `POST`
* **Headers:** `Content-Type: application/json`
* **Request Body JSON Example:**
    ```json
    {
      "user_id": "student_09",
      "experiment_id": "exp_physics_01",
      "trial_data": [
        { "trial_number": 1, "measured_value": 3.15, "notes": "Initial run" },
        { "trial_number": 2, "measured_value": 3.19, "notes": "Slight adjustment" }
      ]
    }
    ```
* **Response (201 Created):**
    ```json
    {
      "status": "logged",
      "report_id": "rep_2026_94821",
      "message": "Experiment results saved successfully"
    }
    ```

---

### 4. AI Chatbot Experiment Guidance
Provides targeted interactive hints, explanations, and safety procedures based on specific laboratory tasks.
* **URL:** `/api/v1/chatbot/query`
* **Method:** `POST`
* **Headers:** `Content-Type: application/json`
* **Request Body JSON Example:**
    ```json
    {
      "experiment_context": "chemical_titration",
      "user_question": "Why did my solution turn bright pink instantly?"
    }
    ```
* **Response (200 OK):**
    ```json
    {
      "response": "An instant bright pink color indicates that you have overshot the endpoint of your titration. The phenolphthalein indicator turns pink when the solution becomes basic. Try adding the titrant drop-by-drop next time.",
      "suggested_follow_ups": [
        "How to reverse an overshot titration?",
        "What is the exact endpoint color?"
      ]
    }
    ```

---

## 🔒 CORS Middleware Configuration
To allow your frontend application (`http://localhost:5173`) to communicate smoothly with these backend routes, ensure the following setup is configured in your `backend/main.py`:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
    "[http://127.0.0.1:5173](http://127.0.0.1:5173)",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)