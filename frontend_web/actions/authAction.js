import Router from 'next/router';
import axios from 'axios';
import { REGISTER, AUTHENTICATE, DEAUTHENTICATE } from './actionTypes';
import { API } from '../../config';
import { setCookie, removeCookie } from '../../utils/cookie';

// register user
const register = ({ email, password, birthDate, gender }, type) => {
  if (type !== 'register') {
    throw new Error('Wrong API call');
  }
  return (dispatch) => {
    axios.post("http://ec2-13-209-14-88.ap-northeast-2.compute.amazonaws.com:22", { email, password, birthDate, gender})
      .then((response) => {
        Router.push('/signin');
        console.log(response.data.meta.message);
      })
      .catch((err) => {
        switch (error.response.status) {
          case 400:
          alert(error.response.data.meta.message);
            break;
          case 409:
          alert(error.response.data.meta.message);
            break;
          default:
          alert(error.response.data.meta.message);
            break;
        }
      });
  };
};