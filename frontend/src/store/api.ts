import { useQuery } from "react-query";
import { LoginInformation } from "../components/types/types";
import { ThunkAction } from "redux-thunk";
import { RootState } from "./index";
import { AnyAction } from "redux";

export const verifyLogin = (
  loginInfo: LoginInformation
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginInfo.email,
        password: loginInfo.password,
      }),
    });
    console.log(await response.json());
  };
};
