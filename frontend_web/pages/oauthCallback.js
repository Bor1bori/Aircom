import {useState, useEffect, useCallback} from 'react';
import { Button } from "@material-ui/core";

/*
const Login = () => {
    const handleGoogleLogin = useCallback(async () => {

        const qParams = [
          `redirect_uri=http://localhost:3000`,
          `scope=https://www.googleapis.com/auth/analytics.readonly}`,
          `login_hint=paramsinghvc@gmail.com`,
          `prompt=consent`,
          `state=google`,
        ].join("&");
        
        try {
          const response = await fetch(`/api/auth-url/google?${qParams}`);
          const url = await response.text();
          window.location.assign(url);
        } catch (e) {
          console.error(e);
        }
        
      }, []);

      return (
          <Button onClick={handleGoogleLogin}>
              구글로 로그인
          </Button>
      )
}*/
const Login = () => {
    let GoogleAuth; // Google Auth object.
    function initClient() {
    gapi.client.init({
        'apiKey': 'AIzaSyDoGQJOX1VQ0lnkDVnyXUus87izW_OSSNI',
        'clientId': '667027998429-043lue44thq1isefi2v63bme4u6ko9dm.apps.googleusercontent.com',
        'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
    }).then(function () {
        GoogleAuth = gapi.auth2.getAuthInstance();

        // Listen for sign-in state changes.
        GoogleAuth.isSignedIn.listen(updateSigninStatus);
    });
    }
}

export default Login;