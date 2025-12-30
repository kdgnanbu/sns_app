import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import Message from "../components/Message";
import Button from "../components/Button";
import AuthLayout from "../components/layout/AuthLayout";
import { registerUser } from "../api/userApi";
import { Link, useNavigate } from "react-router-dom";
import { validateRegister } from "../utils/validation";
export default function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [userMail, setUserMail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const errorMsg = validateRegister({
      userName,
      userMail,
      userPass,
    });
    if (errorMsg) {
      setMessage(errorMsg);
      setMessageType("error");
      return;
    }
    try {
      await registerUser({
        user_name: userName,
        user_mail: userMail,
        user_pass: userPass,
      });
      navigate("/register-success");
      setUserName("");
      setUserMail("");
      setUserPass("");
    } catch (err) {
      if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("登録失敗しました");
      }
    }
  };
  return (
    <AuthLayout>

      <AuthForm
        isRegister={true}
        userName={userName}
        setUserName={setUserName}
        userMail={userMail}
        setUserMail={setUserMail}
        userPass={userPass}
        setUserPass={setUserPass}
        title="新規登録"
        children=""
      />

      <Button color="green" onClick={handleRegister}>登録する</Button>
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
