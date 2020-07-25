import React from "react";
import { GoogleLogin } from "react-google-login";
import Router from "next/router";

const CLIENT_ID =
  "1052521048200-s519v07479vuk61ocrrufo6n9v71hfhh.apps.googleusercontent.com";

class GoogleButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "", //유저 고유번호
      name: "", //유저 이름
    };
  }

  // Google Login
  responseGoogle = (res) => {
    console.log(res);
    Router.push("/");
  };

  // Login Fail
  responseFail = (err) => {
    console.log(err);
    Router.push("/");
  };

  render() {
    return (
      <div>
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Google로 로그인하기"
          onSucess={this.responseGoogle}
          onFailure={this.responseFail}
        />
      </div>
    );
  }
}
export default GoogleButton;
