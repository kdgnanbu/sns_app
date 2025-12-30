// components/PostPopup.jsx
import React from "react";
import Button from "./Button";

export default function PostPopup({
  show,
  onClose,
  content,
  setContent,
  onSubmit,
  message
}) {
  if (!show) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h3>新規投稿</h3>

        <textarea
          style={styles.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="何をシェアしますか？"
        />

        {message?.text && (
          <p style={{ color: message.type === "error" ? "red" : "green" }}>
            {message.text}
          </p>
        )}

        <div style={styles.actions}>
          <Button color="gray" onClick={onClose}>キャンセル</Button>
          <Button color="blue" onClick={onSubmit}>投稿</Button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0,
    width: "100%", height: "100%",
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000
  },
  popup: {
    background: "#fff",
    padding: "20px",
    width: "90%",
    maxWidth: "500px",
    borderRadius: "12px"
  },
  textarea: {
    width: "100%",
    height: "120px",
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    resize: "none"
  },
  actions: {
    marginTop: "12px",
    display: "flex",
    justifyContent: "space-between"
  }
};
