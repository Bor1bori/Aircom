import { authActionTypes } from './action'

const countInitialState = {
  isSignedin: false,
  loginToken: '',
}

export default function reducer(state = countInitialState, action) {
  switch (action.type) {
    case authActionTypes.SIGNIN:
      console.log(1);
      return Object.assign({}, state, {
        isSignedin: true,
        loginToken: action.loginToken
      })
    default:
      return state
  }
}
