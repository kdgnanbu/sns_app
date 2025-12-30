import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import CommentPopup from "../components/CommentPopup";
import { useParams, useNavigate } from "react-router-dom";
import { useCommentActions } from "../components/hooks/useCommentActions";
import { toggleLike } from "../utils/like";
import { formatDateJP } from "../utils/formatDate";
import { useUser } from "../context/UserContext";
import { usePopup } from "../context/PopupContext";
import { usePopupActions } from "../components/hooks/usePopupActions";
import { useFetchPosts } from "../components/hooks/useFetchPosts";
import { useDeletePost } from "../components/hooks/useDeletePost";

export default function PostDetail() {
  const { id } = useParams();
  const { user } = useUser();
  const { deletePost } = useDeletePost();
  const { fetchData } = useFetchPosts();
  const { openCommentPopup } = usePopupActions();
  const { openPopup, closePopup, showPopup, popupType, popupData } = usePopup();
  const { handleComment, message, setMessage } = useCommentActions();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newContent, setNewContent] = useState("");
  const navigate = useNavigate();

  const submitComment = () =>
    handleComment({
      user,
      newContent,
      setNewContent,
      afterSuccess: () => {
        setPost((prev) => ({
          ...prev,
          comment_count: (prev.comment_count || 0) + 1,
        }));
        fetchComments();
      }
    });

  const fetchPost = () =>
    fetchData(
      `http://localhost:3001/api/posts/${id}?user_no=${user?.user_no || ""}`,
      setPost
    );

  const fetchComments = () =>
    fetchData(
      `http://localhost:3001/api/posts/${id}/comments`,
      setComments
    );

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);
  
  if (!post) return <div>読み込み中...</div>;
  return (
    <div style={styles.container}>
      <div style={styles.pageWrapper}>
        <div style={styles.header}>
          <button style={styles.backButton} onClick={() => navigate(-1)}>
            ←
          </button>
          <h2 style={styles.title}>投稿詳細</h2>
          <div style={{ width: "28px" }}></div>
        </div>
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
              setPost,
              user_no: user.user_no,
            });
          }}
          onDelete={() =>
            deletePost(post.post_id, {
              onSuccess: () => navigate("/"),
            })
          }
          onCommentOpen={(p) => openCommentPopup(p, setNewContent)}
          disableNavigate={true}
        />
        <h3 style={styles.commentTitle}>コメント一覧</h3>
        <div style={styles.commentList}>
          {comments.map((c) => (
            <div key={c.comment_id} style={styles.commentItem}>
              <div style={styles.commentHeader}>
                <strong>{c.user_name}</strong>
                <span style={styles.commentDate}>
                  {formatDateJP(c.created_at)}
                </span>
              </div>
              <p style={styles.commentText}>{c.content}</p>
            </div>
          ))}
        </div>
        <CommentPopup
          show={showPopup}
          popupType={popupType}
          user={user}
          targetPost={popupData}
          newContent={newContent}
          setNewContent={setNewContent}
          message={message}
          onClose={closePopup}
          onSubmit={submitComment}
        />
      </div>
    </div>
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
  pageWrapper: {
    width: "100%",
    maxWidth: "700px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  backButton: {
    border: "none",
    background: "none",
    fontSize: "20px",
    cursor: "pointer",
  },
  title: {
    fontSize: "20px",
    fontWeight: "600",
    textAlign: "center",
    flexGrow: 1,
  },
  commentTitle: {
    width: "100%",
    textAlign: "center",
    maxWidth: "700px",
    fontSize: "18px",
    marginBottom: "10px",
    fontWeight: "600",
    color: "#111827",
  },
  commentList: {
    width: "100%",
    maxWidth: "700px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "20px",
  },
  commentItem: {
    background: "#ffffff",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.04)",
  },
  commentHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
  commentDate: {
    fontSize: "12px",
    color: "#6b7280",
  },
  commentText: {
    marginTop: "6px",
    fontSize: "15px",
    color: "#374151",
    whiteSpace: "pre-wrap",
  },
};
