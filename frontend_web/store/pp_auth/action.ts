import {PPAuthActionTypes, PPSIGNIN} from "./types";

export const ppSignin = (ppLoginToken: string): PPAuthActionTypes => ({ 
    type: PPSIGNIN,
    ppLoginToken
});
