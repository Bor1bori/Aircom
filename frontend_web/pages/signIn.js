import React from "react";
import GoogleButton from "./googleButton";

class SignIn extends React.Component {
  state = {
    email: "",
    pw: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleClick = () =>{
    console.log("login");
  };
  render() {
    return (
      <form>
        <label>이메일</label>
        <input
          value={this.state.email}
          onChange={this.handleChange}
          name="email"
        />
        <label>비밀번호</label>
        <input
          type="password"
          value={this.state.pw}
          onChange={this.handleChange}
          name="email"
        />
          <button type="submit" onClick={this.handleClick}>로그인</button>
          <GoogleButton />
      </form>
    );
  }
}

export default SignIn;
