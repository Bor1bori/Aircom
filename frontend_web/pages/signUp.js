import React, {useState} from "react";
import axios from 'axios';
import { useRouter } from 'next/router';

const SignUp = () => {
  const router = useRouter();
  const [signupInput, setSignupInput] = useState({
    email: "",
    password: "",
    gender: "male",
    birthdate: "",
  });
  const onInputChange = (e) => {
    setSignupInput({
      ...signupInput,
      [e.target.name]: e.target.value,
    });
  };
  const onSignup = (e) => {
    e.preventDefault();
    
    axios.post('http://api.myaircom.co.kr/auth/signup', signupInput)
      .then((res) => {
        console.log(res);
        dispatch(signin(res.data.loginToken));
        router.push('/');
      })
      .catch((err) => {
        console.log(err);
      })
  };
  return (
    <form onSubmit={onSignup}>
      <label>이메일</label>
      <input
        value={signupInput.email}
        onChange={onInputChange}
        name="email"
      />
      <label>비밀번호</label>
      <input
        type='password'
        value={signupInput.pw}
        onChange={onInputChange}
        name="password"
      />
      <label>성별</label>
      <select name="gender" value={signupInput.gender} onChange={onInputChange}>
        <option value="male">남성</option>
        <option value="female">여성</option>
        <option value="etc">기타</option>
      </select>
      <label>생년월일</label>
      <input
        value={signupInput.birthdate}
        onChange={onInputChange}
        name="birthdate"
        type="date"
      />
      <button>
        회원가입
      </button>
    </form>
  );
}
export default SignUp;
