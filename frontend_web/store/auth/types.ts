export const SIGNIN = "SIGNIN";

interface SigninAction {
    type: typeof SIGNIN;
    loginToken: string;
    userEmail: string;
}

export interface AuthState {
    isSignedin: boolean;
    loginToken: string;
    userEmail: string;
}

export type AuthActionTypes = SigninAction