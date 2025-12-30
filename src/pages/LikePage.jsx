import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import CommentPopup from "../components/CommentPopup";
import AuthRequireCard from "../components/AuthRequireCard";
import Button from "../components/Button";
import { useCommentActions } from "../components/hooks/useCommentActions";
import { Link, useNavigate } from "react-router-dom";
import { toggleLike } from "../utils/like";
import { useUser } from "../context/UserContext";
import { usePopup } from "../context/PopupContext";
import { usePopupActions } from "../components/hooks/usePopupActions";
import { useFetchPosts } from "../components/hooks/useFetchPosts";
import { useDeletePost } from "../components/hooks/useDeletePost";

export default function LikePage() {
  const { user } = useUser();
  const { deletePost } = useDeletePost();
  const { fetchData } = useFetchPosts();
  const { openCommentPopup } = usePopupActions();
  const { openPopup, closePopup, showPopup, popupType, popupData } = usePopup();
  const { handleComment, message } = useCommentActions();
  const [newContent, setNewContent] = useState("");
  const [likedPosts, setLikedPosts] = useState([]);
  const navigate = useNavigate();

  const submitComment = () =>
    handleComment({
      user,
      newContent,
      setNewContent,
      afterSuccess: () => {
        setLikedPosts((prev) =>
          prev.map((p) =>
            p.post_id === popupData.post_id
              ? { ...p, comment_count: (p.comment_count || 0) + 1 }
              : p
          )
        );
        fetchLikes();
      }
    });

  const fetchLikes = () => {
    if (!user) return;
    fetchData(
      `http://localhost:3001/api/users/${user.user_no}/likes`,
      setLikedPosts
    );
  };

  useEffect(() => {
    if (user) {
      fetchLikes();
    }
  }, [user]);

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

      <div style={styles.container}>
        <div style={styles.feedWrapper}>
          <h2>いいねした投稿</h2>

          {likedPosts.map((post) => (
            <PostCard
              key={post.post_id}
              post={post}
              user={user}
              onLike={async () => {
                if (!user) {
                  openPopup("like", post);
                  return;
                }
                await toggleLike({
                  post,
                  list: likedPosts,
                  setList: setLikedPosts,
                  user_no: user.user_no,
                });
                fetchLikes();
              }}
              onDelete={() =>
                deletePost(post.post_id, {
                  onSuccess: () => {
                    fetchLikes();
                    navigate("/likes");
                  },
                })
              }
              onCommentOpen={(p) => openCommentPopup(p, setNewContent)}
              disableNavigate={false}
            />
          ))}
          {likedPosts.length === 0 && (
            <div style={styles.emptyBox}>
              <p style={styles.emptyText}>まだ「いいね」した投稿はありません。</p>
              <p style={styles.emptySub}>気になる投稿に ❤️ を押してみましょう！</p>
            </div>
          )}
        </div>

        <CommentPopup
          show={showPopup}
          user={user}
          popupType={popupType}
          targetPost={popupData}
          newContent={newContent}
          setNewContent={setNewContent}
          message={message}
          onClose={closePopup}
          onSubmit={submitComment}
        />
      </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f3f4f6",
    padding: "24px 24px 100px 24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  feedWrapper: {
    textAlign: "center",
    width: "100%",
    maxWidth: "700px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
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
  emptyBox: {
    marginTop: "40px",
    padding: "20px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  emptyText: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "4px",
  },
  emptySub: {
    fontSize: "14px",
    color: "#666",
  },
};
