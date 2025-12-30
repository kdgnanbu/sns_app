const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "human2025",
  database: "sns_app",
});

// 接続テスト（任意）
(async () => {
  try {
    const conn = await db.getConnection();
    console.log("MySQL Connected (POOL)");
    conn.release();
  } catch (err) {
    console.error("DB接続エラー:", err);
  }
})();

module.exports = db;
