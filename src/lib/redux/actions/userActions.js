import { apiClient } from "../../api/client";
import { userActionTypes } from "../reducers/userReducer";

export const USER_ID_KEY = "app-user-id";

export function register(email, password) {
  return async (dispatch) => {
    try {
      const existingUser = await apiClient.users.findByEmail(email);

      if (existingUser) {
        dispatch({
          type: userActionTypes.setError,
          payload: "Такой пользователь уже существует!",
        });
        return;
      }

      const result = await apiClient.users.register(email, password);

      localStorage.setItem(USER_ID_KEY, result.id);
      dispatch({ type: userActionTypes.set, payload: result });
    } catch (error) {
      console.error(error);

      dispatch({ type: userActionTypes.setError, payload: error.message });
    }
  };
}

export function login(email, password) {
  return async (dispatch) => {
    try {
      const user = await apiClient.users.login(email, password);

      if (!user) {
        dispatch({
          type: userActionTypes.setError,
          payload: "Введены неправильные данные",
        });

        return;
      }

      localStorage.setItem(USER_ID_KEY, user.id);
      dispatch({ type: userActionTypes.set, payload: user });
    } catch (error) {
      console.error(error);

      dispatch({ type: userActionTypes.setError, payload: error.message });
    }
  };
}

export function logout() {
  return async (dispatch) => {
    try {
      localStorage.removeItem(USER_ID_KEY);
      dispatch({ type: userActionTypes.clear });
    } catch (error) {
      dispatch({ type: userActionTypes.setError, payload: error.message });
    }
  };
}

export function getActiveSession() {
  return async (dispatch) => {
    const userId = localStorage.getItem(USER_ID_KEY);

    try {
      if (!userId) {
        return;
      }

      const result = await apiClient.users.findById(userId);

      if (!result) {
        return;
      }

      dispatch({ type: userActionTypes.set, payload: result });
    } catch (error) {
      console.error(error);

      localStorage.removeItem(USER_ID_KEY);
    } finally {
      dispatch({ type: userActionTypes.markAsReady });
    }
  };
}
