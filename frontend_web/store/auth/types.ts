export const SIGNIN = "SIGNIN";

interface SigninAction {
    type: typeof SIGNIN;
    loginToken: string;
}

export interface AuthState {
    isSignedin: boolean;
    loginToken: string;
}

export type AuthActionTypes = SigninAction