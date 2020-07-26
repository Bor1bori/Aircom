import React from "react";
import Router from 'next/router';

class SignUp extends React.Component {
  state = {
    email: "",
    pw: "",
    gender: "",
    birthDate: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleClick = () => {
    console.log("registered");
    Router.push("/");
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
          type='password'
          value={this.state.pw}
          onChange={this.handleChange}
          name="pw"
        />
        <label>성별</label>
        <select name="gender">
          <option value="male">남성</option>
          <option value="female">여성</option>
          <option value="etc">기타</option>
        </select>
        <label>생년월일</label>
        <input
          value={this.state.birthDate}
          onChange={this.handleChange}
          name="birthDate"
          text="생년월일 8자리" 
        />
        <button type="submit" onClick={this.handleClick}>
          회원가입
        </button>
      </form>
    );
  }
}
export default SignUp;
