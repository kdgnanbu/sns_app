import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import AuthRequireCard from "../components/AuthRequireCard";
import AuthForm from "../components/AuthForm";
import AuthLayout from "../components/layout/AuthLayout";
import { validateRegister } from "../utils/validation";

export default function SettingPage() {
  const { user, setUser } = useUser();
  const [newPassword, setPassword] = useState("");
  const [userName, setUserName] = useState(user?.user_name || "");
  const [userMail, setUserMail] = useState(user?.user_mail || "");
  const [userPass, setUserPass] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  const handleUpdate = async () => {
    let errorMsg = validateRegister({
      userName,
      userMail,
      userPass,
    });

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(newPassword)) {
      errorMsg += "※新しいパスワードは半角英数字で8文字以上必要です\n";
    }

    if (errorMsg) {
      setMessageType("error");
      setMessage(errorMsg);
      return;
    }

    if (user.user_pass !== userPass) {
      setMessageType("error");
      setMessage("登録されているパスワードが違います");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/users/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_no: user.user_no,
          user_name: userName,
          user_mail: userMail,
          new_password: newPassword,
        }),
      });

      if (!res.ok) {
        setMessageType("error");
        setMessage("このメールアドレスは既に登録されています");
        return;
      }

      setUser({
        ...user,
        user_name: userName,
        user_mail: userMail,
        user_pass: newPassword,
      });

      setMessageType("success");
      setMessage("更新が完了しました！");

      setUserPass("");
      setPassword("");
    } catch (err) {
      console.error(err);
      setMessageType("error");
      setMessage("エラーが発生しました");
    }
  };

  return (
    <>
      {!user && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <AuthRequireCard title="ログインが必要です" />
            <Link to="/home" style={styles.link}>
              <Button color="gray">閉じる</Button>
            </Link>
          </div>
        </div>
      )}

      <AuthLayout>
        <AuthForm
          isRegister={true}
          userName={userName}
          setUserName={setUserName}
          userMail={userMail}
          setUserMail={setUserMail}
          userPass={userPass}
          setUserPass={setUserPass}
          title="⚙ 設定"
        />

        {/* 新パスワード入力 */}
        <div style={styles.formGroup}>
          <label style={styles.label}>新しいパスワード:</label>
          <input
            type="password"
            placeholder="新しいパスワード"
            value={newPassword}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <Button onClick={handleUpdate}>変更する</Button>
        {!message && (
          <Message
            type="info"
            text={`パスワードの条件\n・半角英数字 8文字以上\n・英字と数字を少なくとも1文字ずつ含む`}
          />
        )}
        {message && <Message type={messageType} text={message} />}
      </AuthLayout>
    </>
  );
}

const styles = {
  formGroup: {
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
  },
  label: {
    width: "120px",
    fontSize: "14px",
    fontWeight: "bold",
    marginRight: "10px",
    textAlign: "right",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
  },
  popupOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  popup: {
    textAlign: "center",
    background: "#fff",
    width: "100%",
    maxWidth: "500px",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
    margin:"0 20px",
  },
};
