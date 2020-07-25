import GoogleButton from "./googleButton";

export default function SignIn() {
  const handleClick = () => {};


  return (
    <div class="container auth">
      <div class="input-field col s12">
        <label>이메일</label>
        <input name="email" type="text" class="validate" />
      </div>
      <div class="input-field col s12">
        <label>비밀번호</label>
        <input name="password" type="password" class="validate" />
      </div>
      <button onClick={handleClick}>로그인</button>
      <GoogleButton />
    </div>
  );
}
