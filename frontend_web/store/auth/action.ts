import {AuthActionTypes, SIGNIN} from './types';

export const signin = (loginToken: string): AuthActionTypes => ({ 
  type: SIGNIN,
  loginToken
});
