import {AuthActionTypes, SIGNIN} from "./types";
import { setCookie } from "../../utils/cookie";

export const signin = (loginToken: string): AuthActionTypes => {
    setCookie("loginToken", loginToken);

    return { 
        type: SIGNIN,
        loginToken
    };
};
