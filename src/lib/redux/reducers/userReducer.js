const initialState = {
  user: null,
  error: null,
  ready: false,
};

export const userActionTypes = {
  set: "SET_USER",
  clear: "CLEAR_USER",
  setError: "SET_USER_ERROR",
  markAsReady: "MARK_USER_AS_READY",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.set:
      return { ...state, user: action.payload, error: null };

    case userActionTypes.clear:
      return { ...state, user: null, error: null };

    case userActionTypes.setError:
      return { ...state, error: action.payload };

    case userActionTypes.markAsReady:
      return { ...state, ready: true };

    default:
      return state;
  }
};
