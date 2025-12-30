const express = require("express");
const router = express.Router();
const db = require("../db");
// -----------------------------
// ユーザー追加
// -----------------------------
router.post("/", async (req, res) => {
  try {
    const { user_name, user_mail, user_pass } = req.body;
    const sql =
      "INSERT INTO users (user_name, user_mail, user_pass) VALUES (?, ?, ?)";
    await db.query(sql, [user_name, user_mail, user_pass]);
    res.send({ message: "ユーザー追加成功！" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).send({
        message: "このメールアドレスは既に登録されています",
      });
    }
    res.status(500).send({ message: "サーバーエラー", error: err });
  }
});
// -----------------------------
// ユーザー一覧
// -----------------------------
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.send(rows);
  } catch (err) {
    res.status(500).send(err);
  }
});
// -----------------------------
// ユーザー更新
// -----------------------------
router.patch("/update", async (req, res) => {
  try {
    const { user_no, user_name, user_mail, new_password } = req.body;
    const sql = `
      UPDATE users
      SET user_name = ?, user_mail = ?, user_pass = ?
      WHERE user_no = ?
    `;
    await db.query(sql, [user_name, user_mail, new_password, user_no]);
    res.json({ message: "更新しました" });
  } catch (err) {
    console.error("DB エラー:", err);
    res.status(500).json({ message: "サーバーエラー" });
  }
});
// -----------------------------
// いいね一覧
// -----------------------------
router.get("/:userNo/likes", async (req, res) => {
  const userNo = req.params.userNo;
  try {
    const [rows] = await db.query(
      `
      SELECT 
        l.like_id,
        p.post_id,
        p.content,
        p.created_at,
        u.user_name,
        u.user_no,
        -- コメント数
        (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.post_id) AS comment_count,
        -- いいね数
        (SELECT COUNT(*) FROM likes lk WHERE lk.post_id = p.post_id) AS like_count,
        -- ログイン中のユーザーがいいねしているか
        EXISTS(
          SELECT 1 FROM likes lk2 
          WHERE lk2.post_id = p.post_id AND lk2.user_no = ?
        ) AS isLiked
      FROM likes l
      JOIN posts p ON l.post_id = p.post_id
      JOIN users u ON p.user_no = u.user_no
      WHERE l.user_no = ?
      ORDER BY l.created_at DESC
      `,
      [userNo, userNo]
    );
    res.json(rows);
  } catch (err) {
    console.error("いいね一覧取得エラー:", err);
    res.status(500).json({ error: "サーバーエラー" });
  }
});

module.exports = router;
