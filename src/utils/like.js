export const toggleLike = async ({ 
  post,
  setPost,
  list,
  setList,
  user_no
}) => {
  const postId = post.post_id;
  const isLiked = post.isLiked;
  if (!isLiked) {
    await fetch(`http://localhost:3001/api/posts/${postId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_no })
    });
    const updater = (p) =>
      p.post_id === postId
        ? { ...p, isLiked: true, like_count: p.like_count + 1 }
        : p;
    if (list && setList) {
      setList(prev => prev.map(updater));
    } else if (setPost) {
      setPost(prev => updater(prev));
    }
  } else {
    await fetch(
      `http://localhost:3001/api/posts/${postId}/like?user_no=${user_no}`,
      { method: "DELETE" }
    );
    const updater = (p) =>
      p.post_id === postId
        ? { ...p, isLiked: false, like_count: p.like_count - 1 }
        : p;
    if (list && setList) {
      setList(prev => prev.map(updater));
    } else if (setPost) {
      setPost(prev => updater(prev));
    }
  }
};
