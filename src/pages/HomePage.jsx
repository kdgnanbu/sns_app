import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import CommentPopup from "../components/CommentPopup";
import { useCommentActions } from "../components/hooks/useCommentActions";
import { toggleLike } from "../utils/like";
import { useUser } from "../context/UserContext";
import { usePopup } from "../context/PopupContext";
import { usePopupActions } from "../components/hooks/usePopupActions";
import { useFetchPosts } from "../components/hooks/useFetchPosts";
import { useDeletePost } from "../components/hooks/useDeletePost";

export default function HomeFeed() {
  const { user } = useUser();
  const { fetchData } = useFetchPosts();
  const { deletePost } = useDeletePost();
  const { openCommentPopup } = usePopupActions();
  const { showPopup, popupType, popupData, openPopup, closePopup } = usePopup();
  const { handleComment, message, setMessage } = useCommentActions();
  const [posts, setPosts] = useState([]);
  const [newContent, setNewContent] = useState("");

  const submitPost = async () => {
    if (!user || !newContent.trim()) return;
    try {
      const res = await axios.post("http://localhost:3001/api/posts", {
        user_no: user.user_no,
        content: newContent,
      });
      const newPost = {
        post_id: res.data.post_id,
        user_no: user.user_no,
        user_name: user.user_name,
        content: newContent,
        created_at: new Date().toISOString(),
        like_count: 0,
        comment_count: 0,
        isLiked: false,
      };
      setPosts((prev) => [newPost, ...prev]);
      setNewContent("");
      closePopup();
    } catch (err) {
      console.error("submitPost error:", err);
    }
  };

  const submitComment = () =>
    handleComment({
      user,
      newContent,
      setNewContent,
      afterSuccess: () => {
        setPosts((prev) =>
          prev.map((p) =>
            p.post_id === popupData.post_id
              ? { ...p, comment_count: (p.comment_count || 0) + 1 }
              : p
          )
        );
      },
    });

  const handleSubmit = () => {
    if (popupType === "comment") return submitComment();
    if (popupType === "post") return submitPost();
  };

  const fetchPosts = () => {
  const url = user
    ? `http://localhost:3001/api/posts?user_no=${user.user_no}`
    : `http://localhost:3001/api/posts`;
  fetchData(url, setPosts);
};

useEffect(() => {
  fetchPosts();
  if (user) {
    closePopup();
  }
}, [user]);

  return (
    <div style={styles.container}>
      <div style={styles.feedWrapper}>
        <h2>最近の投稿</h2>
        {posts.map((post) => (
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
                list: posts,
                setList: setPosts,
                user_no: user.user_no,
              });
            }}
            onDelete={() =>
              deletePost(post.post_id, {
                onSuccess: () =>
                  setPosts((prev) =>
                    prev.filter((p) => p.post_id !== post.post_id)
                  ),
              })
            }
            onCommentOpen={(p) => openCommentPopup(p, setNewContent)}
            disableNavigate={false}
          />
        ))}
      </div>

      <button style={styles.fab} onClick={() => openPopup("post")}>
        ＋
      </button>

      <CommentPopup
        show={showPopup}
        popupType={popupType}
        user={user}
        targetPost={popupData}
        newContent={newContent}
        setNewContent={setNewContent}
        message={message}
        onClose={() => {
          setNewContent("");
          setMessage({ type: "", text: "" });
          closePopup();
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f3f4f6",
    padding: "24px 24px 100px 24px",
  },
  feedWrapper: {
    textAlign:"center",
    maxWidth: "700px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  fab: {
    position: "fixed",
    bottom: "90px",
    right: "30px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "#4a90e2",
    color: "#fff",
    fontSize: "32px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },
};
