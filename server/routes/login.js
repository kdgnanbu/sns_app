const express = require("express");
const router = express.Router();
const db = require("../db");
// -----------------------------
// ログイン機能
// -----------------------------
router.post("/", async (req, res) => {
  try {
    const { user_mail, user_pass } = req.body;
    const sql =
      "SELECT * FROM users WHERE user_mail = ? AND user_pass = ?";
    const [rows] = await db.query(sql, [user_mail, user_pass]);
    if (rows.length === 0) {
      return res.status(401).send({ message: "メールまたはパスワードが違います" });
    }
    res.send({
      message: "ログイン成功",
      user: rows[0],
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;