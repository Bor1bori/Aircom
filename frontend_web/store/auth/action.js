export const authActionTypes = {
  SIGNIN: 'SIGNIN',
}

export const signin = (loginToken) => ({ 
  type: authActionTypes.SIGNIN,
  loginToken
})
