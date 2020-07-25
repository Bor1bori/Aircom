export default function SignUp() {
    const handleClick = () => {};

  return (
    <div class="container auth">
      <div class="input-field col s12">
        <label>이름</label>
        <input name="name" type="text" class="validate" />
      </div>
      <div class="input-field col s12 email">
        <label>이메일</label>
        <input name="email" type="text" class="validate" />
      </div>
      <div class="input-field col s12">
        <label>비밀번호</label>
        <input name="password" type="password" class="validate" />
      </div>
      <button onClick={handleClick}>회원가입</button>
    </div>
  );
}
