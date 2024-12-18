import { apiClient } from "../../api/client";
import { noteActionTypes } from "../reducers/noteReducer";

export function getMyNotes() {
  return async (dispatch, getState) => {
    try {
      const state = getState();

      const result = await apiClient.notes.findByAuthorId(state.user.user.id);

      dispatch({ type: noteActionTypes.set, payload: result });
    } catch (error) {
      dispatch({ type: noteActionTypes.setError, payload: error.message });
    } finally {
      dispatch({ type: noteActionTypes.markAsReady });
    }
  };
}

export function createNote(title, body) {
  return async (dispatch, getState) => {
    try {
      const state = getState();

      const newNote = await apiClient.notes.create(
        title,
        body,
        state.user.user.id
      );

      dispatch({ type: noteActionTypes.add, payload: newNote });
    } catch (error) {
      dispatch({ type: noteActionTypes.setError, payload: error.message });
    }
  };
}

export function deleteNote(id) {
  return async (dispatch) => {
    try {
      await apiClient.notes.remove(id);

      dispatch({ type: noteActionTypes.delete, payload: id });
    } catch (error) {
      dispatch({ type: noteActionTypes.setError, payload: error.message });
    }
  };
}

export function updateNote(id, data) {
  return async (dispatch) => {
    try {
      const result = await apiClient.notes.update(id, data);

      dispatch({ type: noteActionTypes.update, payload: result });
    } catch (error) {
      dispatch({ type: noteActionTypes.setError, payload: error.message });
    }
  };
}
