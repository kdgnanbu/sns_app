import { useState } from "react";
import { usePopup } from "../../context/PopupContext";
export function useCommentActions() {
  const { popupData, closePopup } = usePopup();
  const [message, setMessage] = useState({ type: "", text: "" });
  const handleComment = async ({
    user,
    newContent,
    setNewContent,
    afterSuccess,
  }) => {
    if (!user) {
      alert("ログインしてください");
      return;
    }
    if (!popupData || !popupData.post_id) {
      alert("コメント先の情報がありません");
      return;
    }
    if (!newContent.trim()) {
      setMessage({ type: "error", text: "コメントを入力してください" });
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:3001/api/posts/${popupData.post_id}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_no: user.user_no,
            content: newContent,
          }),
        }
      );
      if (!res.ok) {
        console.error("comment API error:", res.status);
        alert("コメント送信に失敗しました");
        return;
      }
      setNewContent("");
      closePopup();
      alert("コメントを投稿しました");
      if (afterSuccess) afterSuccess();
    } catch (err) {
      console.error("handleComment error:", err);
      alert("コメント送信でエラーが起きました");
    }
  };
  return { handleComment, message, setMessage };
}
