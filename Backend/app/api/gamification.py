from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Dict
from app.services import gamification_service

# Initialize the SQLite database on module import
gamification_service.init_db()

router = APIRouter(prefix="/api/gamification", tags=["gamification"])

# Pydantic Schemas
class QuizCompletionRequest(BaseModel):
    user_id: str = Field(default="default-student", description="The identifier of the student")
    experiment_id: str = Field(..., description="ID of the completed experiment")
    score: int = Field(..., ge=0, le=5, description="Score achieved (0-5)")
    total_questions: int = Field(default=5, description="Total questions in the quiz")
    subject: str = Field(..., description="Subject of the experiment (biology, chemistry, physics)")

class ProgressResponse(BaseModel):
    user_id: str
    xp: int
    completed_quizzes: Dict[str, int]
    unlocked_badges: List[str]

class CompletionResponse(BaseModel):
    xp_earned: int
    new_badges: List[str]
    total_xp: int
    completed_quizzes: Dict[str, int]
    unlocked_badges: List[str]

@router.get("/status", response_model=ProgressResponse)
def get_status(user_id: str = "default-student"):
    """
    Get the current student's gamification stats (XP, completed quizzes, unlocked badges).
    """
    try:
        progress = gamification_service.get_user_progress(user_id)
        return progress
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database load error: {str(e)}")

@router.post("/complete-quiz", response_model=CompletionResponse)
def submit_quiz(payload: QuizCompletionRequest):
    """
    Submit the score of a completed post-experiment quiz.
    Calculates XP gains, verifies badge triggers, and updates the database.
    """
    try:
        result = gamification_service.complete_quiz(
            user_id=payload.user_id,
            experiment_id=payload.experiment_id,
            score=payload.score,
            total_questions=payload.total_questions,
            subject=payload.subject.lower()
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database save error: {str(e)}")
