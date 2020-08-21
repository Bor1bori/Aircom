import { AuthActionTypes, AuthState, SIGNIN } from "./types";

const authInitialState: AuthState = {
    isSignedin: false,
    loginToken: "",
};

export default function reducer(state = authInitialState, action: AuthActionTypes) {
    switch (action.type) {
    case SIGNIN:
        console.log(1);
        return Object.assign({}, state, {
            isSignedin: true,
            loginToken: action.loginToken
        });
    default:
        return state;
    }
}
