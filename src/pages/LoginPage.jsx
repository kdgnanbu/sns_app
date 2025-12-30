import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import Message from "../components/Message";
import Button from "../components/Button";
import AuthLayout from "../components/layout/AuthLayout";
import { loginUser } from "../api/userApi";
import { validateLogin } from "../utils/validation";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function LoginPage() {
  const { setUser } = useUser();
  const [userMail, setUserMail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const errorMsg = validateLogin({ userMail, userPass });

    if (errorMsg) {
      setMessage(errorMsg);
      setMessageType("error");
      return;
    }

    try {
      const res = await loginUser({
        user_mail: userMail,
        user_pass: userPass,
      });
      setUser(res.data.user);
      setTimeout(() => {
        navigate("/home");
      }, 100);
    } catch (err) {
      setMessage("※メールアドレスまたはパスワードが正しくありません");
      setMessageType("error");
    }
  };

  return (
    <AuthLayout>
      <AuthForm
        isRegister={false}
        userMail={userMail}
        setUserMail={setUserMail}
        userPass={userPass}
        setUserPass={setUserPass}
        title="ログイン"
        children=""
      />
      <Button onClick={handleLogin}>ログイン</Button>
      {!message && (
        <Message
          type="info"
          text={`パスワードの条件\n・半角英数字 8文字以上\n・英字と数字を少なくとも1文字ずつ含む`}
        />
      )}
      {message && <Message type={messageType} text={message} />}
    </AuthLayout>

  );
}

