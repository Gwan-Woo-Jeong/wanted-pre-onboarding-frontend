import React, { useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";
import { useHistory } from "react-router-dom";
import { useModal } from "../contexts/ModalContext";

function SignUp({ onSignupSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const { isOpen, openModal } = useModal();

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
      const res = await axios.post(
        "https://www.pre-onboarding-selection-task.shop/auth/signup",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.status === 201 && onSignupSuccess) {
        openModal("signUp");
        onSignupSuccess();
      }
    } catch (error) {
      setError(error.response.data.message);
      console.error("회원가입 에러 :", error);
    }
  };

  return (
    <div id="sign-up">
      <img
        src="https://velog.velcdn.com/images/hihijin/post/18b2015e-921d-48ac-b8d8-468762194575/image.png"
        alt="signup-img"
      />
      <div className="form-container">
        <a href="/signin" class="back-btn">
          <svg
            fill="none"
            stroke="currentColor"
            stroke-width="1.1"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            ></path>
          </svg>
          <span>로그인</span>
        </a>
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
            data-testid="signup-button"
            type="submit"
            disabled={!isValidEmail(email) || !isValidPassword(password)}
          >
            회원가입
          </button>
        </form>
      </div>
      <Modal
        isVisible={isOpen.signUp}
        hideCloseBtn
        onClose={() => history.replace("/signIn")}
      >
        <div id="sign-up-modal">
          <p>회원가입이 완료되었습니다!</p>
          <p>로그인해주세요</p>
          <button onClick={() => history.replace("/signIn")}>확인</button>
        </div>
      </Modal>
    </div>
  );
}

export default SignUp;
