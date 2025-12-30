
import axios from "axios";
import { useState } from "react";

export function useDeletePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * 投稿削除（共通化）
   * @param {number} postId - 削除する投稿ID
   * @param {object} options - 成功後コールバック
   * @param {function} options.onSuccess - 削除成功後に実行される処理
   * @param {function} options.onError - 削除失敗時に実行される処理（任意）
   */
  const deletePost = async (postId, { onSuccess, onError } = {}) => {
    if (!window.confirm("削除しますか？")) return;

    setLoading(true);
    setError("");

    try {
      await axios.delete(`http://localhost:3001/api/posts/${postId}`);

      if (onSuccess) onSuccess();

    } catch (err) {
      console.error("deletePost error:", err);
      setError("削除に失敗しました");

      if (onError) onError(err);
    } finally {
      setLoading(false);
    }
  };

  return { deletePost, loading, error };
}
