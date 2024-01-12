import Swal from "sweetalert2";
import { fetchWithToken, fetchWithOutToken } from "../helpers/fetch";
import { types } from "../types/types";

export const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogin = (username, password) => {
  return async (dispatch) => {
    const resp = await fetchWithOutToken(
      "auth/login",
      { username, password },
      "POST"
    );
    const body = await resp.json();
    if (body.accessToken) {
      localStorage.setItem("token", body.accessToken);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(login({ uid: body.uid, name: body.name }));
    } else {
      Swal.fire("Error", body.message, "error");
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("auth/renewToken");
    const body = await resp.json();
    if (body.accessToken) {
      localStorage.setItem("token", body.accessToken);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(login({ uid: body.uid, name: body.name }));
    } else {
      dispatch(checkingFinish());
    }
  };
};

export const checkingFinish = () => ({ type: types.authCheckingFinish });

export const startLogout = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    dispatch(logout());
  };
};
const logout = () => ({ type: types.authLogout });
