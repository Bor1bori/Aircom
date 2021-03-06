import {PPAuthActionTypes, PPSIGNIN} from "./types";
import { setCookie } from "../../utils/cookie";

export const ppSignin = (ppLoginToken: string, ppUserEmail:string): PPAuthActionTypes => {
    setCookie("ppLoginToken", ppLoginToken);
    
    return { 
        type: PPSIGNIN,
        ppLoginToken,
        ppUserEmail,
    };
};
