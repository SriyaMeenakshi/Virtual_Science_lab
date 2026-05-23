from typing import Optional

from fastapi import APIRouter

from app.models.schemas import ExperimentNotesResponse, ExperimentNotesUpsertRequest
from app.services import notes_service

# Initialize the SQLite database on module import
notes_service.init_db()

router = APIRouter(prefix="/api/notes", tags=["notes"])


@router.get("/{user_id}/{experiment_id}", response_model=ExperimentNotesResponse)
def get_notes(user_id: str, experiment_id: str):
    try:
        notes = notes_service.get_user_experiment_notes(user_id=user_id, experiment_id=experiment_id)
        if not notes:
            return ExperimentNotesResponse(
                user_id=user_id,
                experiment_id=experiment_id,
                observations=None,
                conclusions=None,
                learnings=None,
                notes=None,
                created_at=None,
                updated_at=None,
            )
        return ExperimentNotesResponse(**notes)
    except Exception as exc:
        # FastAPI will convert this to 500
        raise exc


@router.post("/upsert", response_model=ExperimentNotesResponse)
def upsert_notes(payload: ExperimentNotesUpsertRequest):
    return notes_service.upsert_user_experiment_notes(
        user_id=payload.user_id,
        experiment_id=payload.experiment_id,
        observations=payload.observations,
        conclusions=payload.conclusions,
        learnings=payload.learnings,
        notes=payload.notes,
    )

