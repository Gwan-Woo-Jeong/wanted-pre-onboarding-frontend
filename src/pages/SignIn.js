import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function SignUp({ onSigninSuccess, token }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (token !== null) history.replace("/todo");
  }, [token]);

  const isValidEmail = (email) => email.includes("@");
  const isValidPassword = (password) => password.length >= 8;

  const handleInput = (e, type) => {
    if (type === "email") {
      setEmail(e.target.value);
    } else if (type === "password") {
      setPassword(e.target.value);
    }
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { access_token },
      } = await axios.post(
        "https://www.pre-onboarding-selection-task.shop/auth/signin",
        { email, password }
      );

      if (onSigninSuccess && access_token) onSigninSuccess(access_token);
    } catch (error) {
      setError(error.response.data.message);
      console.error("로그인 에러:", error);
    }
  };

  return (
    <div id="sign-in">
      <img
        src="https://velog.velcdn.com/images/hihijin/post/18b2015e-921d-48ac-b8d8-468762194575/image.png"
        alt="signup-img"
      />
      <form onSubmit={handleSubmit}>
        <input
          data-testid="email-input"
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => handleInput(e, "email")}
        />
        <input
          data-testid="password-input"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => handleInput(e, "password")}
        />
        {error && <p>{error}</p>}
        <button
          data-testid="signin-button"
          type="submit"
          disabled={!isValidEmail(email) || !isValidPassword(password)}
        >
          로그인
        </button>
        <a href="/signup">회원가입</a>
      </form>
    </div>
  );
}

export default SignUp;
