const initialState = {
  notes: [],
  error: null,
  loading: false,
  ready: false,
};

export const noteActionTypes = {
  set: "SET_NOTES",
  add: "ADD_NOTE",
  delete: "DELETE_NOTE",
  update: "UPDATE_NOTE",
  setError: "NOTE_SET_ERROR",
  clearError: "NOTE_CLEAR_ERROR",
  markAsReady: "NOTE_MARK_AS_READY",
};

export const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case noteActionTypes.set:
      return { ...state, notes: action.payload, error: null };

    case noteActionTypes.add:
      return { ...state, notes: [...state.notes, action.payload], error: null };

    case noteActionTypes.delete:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
        error: null,
      };

    case noteActionTypes.update:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? { ...note, ...action.payload } : note
        ),
        error: null,
      };

    case noteActionTypes.setError:
      return { ...state, error: action.payload };

    case noteActionTypes.clearError:
      return { ...state, error: null };

    case noteActionTypes.markAsReady:
      return { ...state, ready: true };

    default:
      return state;
  }
};
