import { PPAuthActionTypes, PPAuthState, PPSIGNIN } from "./types";

const authInitialState: PPAuthState = {
    isSignedin: false,
    ppLoginToken: "",
};

export default function reducer(state = authInitialState, action: PPAuthActionTypes) {
    switch (action.type) {
    case PPSIGNIN:
        console.log(1);
        return Object.assign({}, state, {
            isSignedin: true,
            ppLoginToken: action.ppLoginToken
        });
    default:
        return state;
    }
}
