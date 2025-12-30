import { Link } from "react-router-dom";
import Button from "../components/Button";
export default function AuthRequireCard({ title }) {
  return (
 <div>
      <h2 style={styles.title}>{title}</h2>
      <p style={styles.text}>
        この機能を利用するにはアカウントが必要です
               <br />
      {/* </p>
      <p style={styles.text}> */}
        「ログイン」もしくは「新規登録」
        <br />
        を行ってください
      </p>
      <Link to="/login" style={styles.link}>
        <Button>ログイン</Button>
      </Link>
      <Link to="/register" style={styles.link}>
        <Button color="green">新規登録</Button>
      </Link>
 </div>
  );
}

const styles = {
  title: {
    marginBottom: "20px",
    color: "#333",
  },
  link: {
    textAlign: "center",
    width: "100%",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
  },
    text: {
    margin: "20px 0",
    fontSize: "14px",
    // color: "#555",
    // textAlign:"left",
  },
};
