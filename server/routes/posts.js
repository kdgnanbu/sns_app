const express = require("express");
const router = express.Router();
const db = require("../db");
// -----------------------------
// 投稿一覧取得
// -----------------------------
router.get("/", async (req, res) => {
  const user_no = req.query.user_no;
  try {
    const sql = `
      SELECT 
        p.post_id,
        p.content,
        p.created_at,
        u.user_no,
        u.user_name,
        COUNT(c.comment_id) AS comment_count,
        (SELECT COUNT(*) FROM likes lk WHERE lk.post_id = p.post_id) AS like_count,
        EXISTS(
          SELECT 1 FROM likes l WHERE l.post_id = p.post_id AND l.user_no = ?
        ) AS isLiked
      FROM posts p
      JOIN users u ON p.user_no = u.user_no
      LEFT JOIN comments c ON p.post_id = c.post_id
      GROUP BY p.post_id
      ORDER BY p.created_at DESC
    `;
    const [rows] = await db.query(sql, [user_no]);
    res.json(rows);
  } catch (err) {
    console.error("投稿一覧取得エラー:", err);
    res.status(500).json({ error: "サーバーエラー" });
  }
});
// -----------------------------
// 投稿追加
// -----------------------------
router.post("/", async (req, res) => {
  try {
    const { user_no, content } = req.body;
    if (!user_no || !content) {
      return res.status(400).json({ error: "user_no と content は必須です" });
    }
    const sql = `
      INSERT INTO posts (user_no, content)
      VALUES (?, ?)
    `;
    const [result] = await db.query(sql, [user_no, content]);
    res.json({
      success: true,
      post_id: result.insertId,
    });
  } catch (err) {
    console.error("投稿保存エラー:", err);
    res.status(500).json({ error: "投稿に失敗しました" });
  }
});
// -----------------------------
// 投稿削除
// -----------------------------
router.delete("/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const sql = "DELETE FROM posts WHERE post_id = ?";
    const [result] = await db.query(sql, [postId]);
    res.json({ message: "削除成功" });
  } catch (err) {
    console.error("削除エラー:", err);
    res.status(500).json({ error: "サーバーエラー" });
  }
});
// -----------------------------
// コメント送信
// -----------------------------
router.post("/:postId/comments", async (req, res) => {
  const postId = req.params.postId;
  const { user_no, content } = req.body;
  if (!content) return res.status(400).json({ error: "内容が空です" });
  try {
    const [result] = await db.query(
      `INSERT INTO comments (post_id, user_no, content)
       VALUES (?, ?, ?)`,
      [postId, user_no, content]
    );
        const [[userInfo]] = await db.query(
      `SELECT user_name FROM users WHERE user_no = ?`,
      [user_no]
    );
    res.json({
      comment_id: result.insertId,
      post_id: postId,
      user_no,
      user_name: userInfo.user_name,
      content,
      created_at: new Date(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "コメント追加エラー" });
  }
});
// -----------------------------
// コメント一覧取得
// -----------------------------
router.get("/:postId/comments", async (req, res) => {
  const postId = req.params.postId;
  try {
    const [rows] = await db.query(
      `SELECT c.*, u.user_name 
       FROM comments c
       JOIN users u ON c.user_no = u.user_no
       WHERE c.post_id = ?
       ORDER BY c.created_at DESC`,
      [postId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "コメント取得エラー" });
  }
});
// -----------------------------
// 投稿1件取得
// -----------------------------
router.get("/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const userNo = req.query.user_no;
    const sql = `
      SELECT 
        p.post_id,
        p.content,
        p.created_at,
        u.user_no,
        u.user_name,
        (SELECT COUNT(*) FROM likes WHERE post_id = p.post_id) AS like_count,
        (SELECT COUNT(*) FROM comments WHERE post_id = p.post_id) AS comment_count,
        (
          SELECT COUNT(*) 
          FROM likes 
          WHERE post_id = p.post_id AND user_no = ?
        ) AS isLiked
      FROM posts p
      JOIN users u ON p.user_no = u.user_no
      WHERE p.post_id = ?
    `;
    const [rows] = await db.query(sql, [userNo, postId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "投稿が見つかりません" });
    }
    const result = {
      ...rows[0],
      isLiked: rows[0].isLiked > 0
    };
    res.json(result);
  } catch (err) {
    console.error("投稿取得エラー:", err);
    res.status(500).json({ error: "サーバーエラー" });
  }
});
// -----------------------------
// いいね追加
// -----------------------------
router.post("/:postId/like", async (req, res) => {
  const postId = req.params.postId;
  const { user_no } = req.body;
  try {
    await db.query(
      `INSERT INTO likes (post_id, user_no) VALUES (?, ?)`,
      [postId, user_no]
    );
    res.json({ message: "いいねしました" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "すでにいいねしています" });
    }
    res.status(500).json({ error: "いいねエラー" });
  }
});
// -----------------------------
// いいね削除
// -----------------------------
router.delete("/:postId/like", async (req, res) => {
  const postId = req.params.postId;
  const user_no = req.query.user_no || req.body?.user_no;
  if (!user_no) {
    return res.status(400).json({ error: "user_no が指定されていません" });
  }
  try {
    await db.query(
      `DELETE FROM likes WHERE post_id = ? AND user_no = ?`,
      [postId, user_no]
    );
    res.json({ message: "いいね解除しました" });
  } catch (err) {
    console.error("like 削除エラー:", err);
    res.status(500).json({ error: "削除エラー" });
  }
});

module.exports = router;