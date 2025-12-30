// src/components/hooks/usePopupActions.js

import { usePopup } from "../../context/PopupContext";
import { useCommentActions } from "./useCommentActions";

export function usePopupActions() {
  const { openPopup, closePopup } = usePopup();
  const { setMessage } = useCommentActions();

  /**
   * コメントポップアップを開く処理を共通化
   * - 入力欄クリア
   * - メッセージ初期化
   * - openPopup でコメント画面を開く
   */
  const openCommentPopup = (post, setNewContent) => {
    setNewContent(""); // コメント欄を空にする
    setMessage({ type: "", text: "" }); // 成功/失敗メッセージ消す
    openPopup("comment", post); // commentポップアップを開く
  };

  return {
    openCommentPopup,
    closePopup,
  };
}
