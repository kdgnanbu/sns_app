import { Link } from "react-router-dom";
import Button from "../components/Button";
import AuthLayout from "../components/layout/AuthLayout";
export default function RegisterSuccessPage() {
  return (
    <AuthLayout>
      <h2 style={styles.title}>登録が完了しました！</h2>
      <p style={styles.text}>
        ログインしてSNSを始めましょう。
      </p>
      <Button>
        <Link to="/login" style={styles.link}>ログイン画面へ</Link>
      </Button>
    </AuthLayout>
  );
}

const styles = {
  title: {
    marginBottom: "15px",
  },
  text: {
    fontSize: "15px",
    marginBottom: "20px",
  },
    link: {
    textAlign: "center",
    width: "60%",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
  },
};
