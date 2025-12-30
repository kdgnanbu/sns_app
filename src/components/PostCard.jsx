import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { formatDateJP } from "../utils/formatDate";

export default function PostCard({ post, onLike, onCommentOpen, onDelete,disableNavigate}) {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div
      style={styles.card}
      onClick={() => {
        if (!disableNavigate) {
          navigate(`/post/${post.post_id}`);
        }
      }}
    >
      <div style={styles.cardHeader}>
        <h3 style={styles.userName}>{post.user_name}</h3>
        <span style={styles.date}>{formatDateJP(post.created_at)}</span>
      </div>
      <p style={styles.content}>{post.content}</p>
      <div style={styles.actionRow} onClick={(e) => e.stopPropagation()}>
        <button
          style={styles.actionButton}
          onClick={() => onLike(post.post_id)}
        >
          {post.isLiked ? "❤️" : "🤍"} ({post.like_count})
        </button>
        <button
          style={styles.actionButton}
          onClick={() => onCommentOpen(post)}
        >
          💬 コメント({post.comment_count})
        </button>
        {user && user.user_no === post.user_no && (
          <button
            style={styles.deleteButton}
            onClick={() => onDelete(post.post_id)}
          >
            🗑️ 削除
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    textAlign: "left",
    background: "#fff",
    borderRadius: "16px",
    padding: "20px",
    border: "1px solid #ddd",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    transition: "0.2s",
    cursor: "pointer",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },

  userName: {
    fontSize: "20px",
    fontWeight: "600",
  },

  date: {
    fontSize: "12px",
    color: "#7d7d7d",
  },

  contentLink: {
    textDecoration: "none",
    color: "inherit",
  },

  content: {
    color: "#555",
    lineHeight: "1.6",
    whiteSpace: "pre-wrap",
    marginBottom: "12px",
  },

  actionRow: {
    display: "flex",
    gap: "20px",
    marginTop: "10px",
    alignItems: "center",
  },

  actionButton: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
    fontSize: "14px",
    background: "transparent",
    border: "none",
  },

  deleteButton: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
    fontSize: "14px",
    background: "transparent",
    border: "none",
    color: "#cc3333",
  },
};
