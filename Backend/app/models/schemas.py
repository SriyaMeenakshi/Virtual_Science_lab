from typing import Optional

from pydantic import BaseModel


class QueryRequest(BaseModel):
    question: str


class QueryResponse(BaseModel):
    answer: str


class ExperimentNotesUpsertRequest(BaseModel):
    user_id: str
    experiment_id: str
    observations: Optional[str] = None
    conclusions: Optional[str] = None
    learnings: Optional[str] = None
    notes: Optional[str] = None


class ExperimentNotesResponse(BaseModel):
    user_id: str
    experiment_id: str
    observations: Optional[str] = None
    conclusions: Optional[str] = None
    learnings: Optional[str] = None
    notes: Optional[str] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

