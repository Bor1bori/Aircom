export const PPSIGNIN = "PPSIGNIN";

interface PPSigninAction {
    type: typeof PPSIGNIN;
    ppLoginToken: string;
}

export interface PPAuthState {
    isSignedin: boolean;
    ppLoginToken: string;
}

export type PPAuthActionTypes = PPSigninAction