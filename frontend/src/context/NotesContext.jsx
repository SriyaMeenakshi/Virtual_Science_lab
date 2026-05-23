import { useCallback, useEffect, useMemo, useState } from "react";
import API_URL from "../config";
import { NotesContext } from "./useNotes";

const USER_ID = "default-student";
const STORAGE_KEY = "vsl-experiment-notes";

const BASE_URL =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://127.0.0.1:8000"
    : API_URL;

const readLocalNotes = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {};
  } catch {
    return {};
  }
};

const writeLocalNotes = (next) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
};

export const NotesProvider = ({ children }) => {
  const [notesByExperimentId, setNotesByExperimentId] = useState({});
  const [loading, setLoading] = useState(true);
  const [usingLocalFallback, setUsingLocalFallback] = useState(false);

  useEffect(() => {
    // Load local cache immediately for responsiveness.
    setNotesByExperimentId(readLocalNotes());
  }, []);

  const refreshNotesForExperiment = useCallback(async (experimentId) => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/notes/${USER_ID}/${experimentId}`);
      if (!res.ok) throw new Error("Notes API unavailable");
      const data = await res.json();
      const normalized = {
        user_id: data.user_id,
        experiment_id: data.experiment_id,
        observations: data.observations || "",
        conclusions: data.conclusions || "",
        learnings: data.learnings || "",
        notes: data.notes || "",
        created_at: data.created_at || null,
        updated_at: data.updated_at || null,
      };
      setNotesByExperimentId((prev) => {
        const next = { ...prev, [experimentId]: normalized };
        writeLocalNotes(next);
        return next;
      });
      setUsingLocalFallback(false);
      return normalized;
    } catch {
      setUsingLocalFallback(true);
      const local = readLocalNotes();
      const existing = local[experimentId] || null;
      setLoading(false);
      return existing;
    } finally {
      setLoading(false);
    }
  }, []);

  const upsertNotes = useCallback(async (experimentId, payload) => {
    const body = {
      user_id: USER_ID,
      experiment_id: experimentId,
      observations: payload.observations ?? "",
      conclusions: payload.conclusions ?? "",
      learnings: payload.learnings ?? "",
      notes: payload.notes ?? "",
    };

    setNotesByExperimentId((prev) => {
      const existing = prev[experimentId] || {};
      const nextRecord = {
        ...existing,
        ...body,
        user_id: USER_ID,
        experiment_id: experimentId,
      };
      const next = { ...prev, [experimentId]: nextRecord };
      writeLocalNotes(next);
      return next;
    });

    try {
      const res = await fetch(`${BASE_URL}/api/notes/upsert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Notes API unavailable");
      const data = await res.json();

      const normalized = {
        user_id: data.user_id,
        experiment_id: data.experiment_id,
        observations: data.observations || "",
        conclusions: data.conclusions || "",
        learnings: data.learnings || "",
        notes: data.notes || "",
        created_at: data.created_at || null,
        updated_at: data.updated_at || null,
      };

      setNotesByExperimentId((prev) => {
        const next = { ...prev, [experimentId]: normalized };
        writeLocalNotes(next);
        return next;
      });
      setUsingLocalFallback(false);
      return normalized;
    } catch {
      setUsingLocalFallback(true);
      return null;
    }
  }, []);

  const getNotes = useCallback(
    (experimentId) => notesByExperimentId[experimentId] || null,
    [notesByExperimentId]
  );

  const api = useMemo(
    () => ({
      getNotes,
      refreshNotesForExperiment,
      upsertNotes,
      loading,
      usingLocalFallback,
    }),
    [getNotes, loading, refreshNotesForExperiment, upsertNotes, usingLocalFallback]
  );

  return <NotesContext.Provider value={api}>{children}</NotesContext.Provider>;
};


