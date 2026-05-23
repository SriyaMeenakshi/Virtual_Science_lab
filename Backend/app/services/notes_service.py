import os
import sqlite3
from datetime import datetime, timezone
from typing import Optional, Dict, Any

DB_PATH = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "..", "..", "gamification.db"
)


def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS experiment_notes (
            user_id TEXT NOT NULL,
            experiment_id TEXT NOT NULL,
            observations TEXT,
            conclusions TEXT,
            learnings TEXT,
            notes TEXT,
            created_at TEXT,
            updated_at TEXT,
            PRIMARY KEY (user_id, experiment_id)
        )
        """
    )
    conn.commit()
    conn.close()


def get_user_experiment_notes(user_id: str, experiment_id: str) -> Optional[Dict[str, Any]]:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        """
        SELECT user_id, experiment_id, observations, conclusions, learnings, notes, created_at, updated_at
        FROM experiment_notes
        WHERE user_id = ? AND experiment_id = ?
        """,
        (user_id, experiment_id),
    )
    row = cursor.fetchone()
    conn.close()

    if not row:
        return None

    return {
        "user_id": row["user_id"],
        "experiment_id": row["experiment_id"],
        "observations": row["observations"],
        "conclusions": row["conclusions"],
        "learnings": row["learnings"],
        "notes": row["notes"],
        "created_at": row["created_at"],
        "updated_at": row["updated_at"],
    }


def upsert_user_experiment_notes(
    user_id: str,
    experiment_id: str,
    observations: Optional[str] = None,
    conclusions: Optional[str] = None,
    learnings: Optional[str] = None,
    notes: Optional[str] = None,
):
    now = datetime.now(timezone.utc).isoformat()

    # Keep `notes` as an optional combined field, but primary usage is the structured fields.
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        """
        INSERT INTO experiment_notes (
            user_id,
            experiment_id,
            observations,
            conclusions,
            learnings,
            notes,
            created_at,
            updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(user_id, experiment_id) DO UPDATE SET
            observations = excluded.observations,
            conclusions = excluded.conclusions,
            learnings = excluded.learnings,
            notes = excluded.notes,

            updated_at = ?
        """,
        (
            user_id,
            experiment_id,
            observations,
            conclusions,
            learnings,
            notes,
            now,
            now,
            now,
        ),
    )

    conn.commit()
    conn.close()

    # Return latest
    return get_user_experiment_notes(user_id, experiment_id)

