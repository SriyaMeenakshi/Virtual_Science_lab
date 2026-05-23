import { createContext, useContext } from "react";

export const NotesContext = createContext();

export function useNotes() {
  return useContext(NotesContext);
}
