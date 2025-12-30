import Button from "./Button";
import Message from "./Message";
import AuthRequireCard from "./AuthRequireCard";

export default function CommentPopup({
  show,
  user,
  popupType,
  targetPost,
  newContent,
  setNewContent,
  message,
  onClose,
  onSubmit,
}) {
  if (!show) return null;
  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        {
        !user ? (
          <>
            <AuthRequireCard title="ログインが必要です" />
            <Button color="gray" onClick={onClose}>
              閉じる
            </Button>
          </>
        ) : (
          <>
            {popupType === "comment" && (
              <>
                <h2>コメントする</h2>
                {targetPost && (
                  <p style={styles.replyTo}>投稿者：{targetPost.user_name}</p>
                )}
                <textarea
                  style={styles.textarea}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="コメントを書く"
                />
                <div style={styles.actions}>
                  <Button onClick={onSubmit}>コメントを送る</Button>
                  <Button color="gray" onClick={onClose}>閉じる</Button>
                </div>
                <Message type={message.type} text={message.text} />
              </>
            )}

            {popupType === "post" && (
              <>
                <h2>新規投稿</h2>
                <textarea
                  style={styles.textarea}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="今なにしてる？"
                />
                <div style={styles.actions}>
                  <Button onClick={onSubmit}>投稿する</Button>
                  <Button color="gray" onClick={onClose}>閉じる</Button>
                </div>
                <Message type={message.type} text={message.text} />
              </>
            )}
          </>
        )}

      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  popup: {
    background: "#fff",
    width: "90%",
    maxWidth: "500px",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
    textAlign: "center",
        margin:"0 20px",
  },
  replyTo: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "10px",
  },
  textarea: {
    width: "90%",
    height: "120px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    resize: "none",
    fontSize: "14px",
    marginBottom: "12px",
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "center",
  },
};
