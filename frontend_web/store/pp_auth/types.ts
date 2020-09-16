export const PPSIGNIN = "PPSIGNIN";

interface PPSigninAction {
    type: typeof PPSIGNIN;
    ppLoginToken: string;
    ppUserEmail: string;
}

export interface PPAuthState {
    isSignedin: boolean;
    ppLoginToken: string;
    ppUserEmail: string;
}

export type PPAuthActionTypes = PPSigninAction