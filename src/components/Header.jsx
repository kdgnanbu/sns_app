import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Header() {
  const { user, setUser } = useUser();
  const logout = () => {
    if (!window.confirm("ログアウトしますか？")) return;
    setTimeout(() => {
      setUser(null);
    }, 300);
  };
  return (
    <header style={styles.header}>
      <h1 style={styles.logo}>
        <Link to="/home" style={styles.logoLink}>MySNS</Link>
      </h1>
      <div style={styles.userArea}>
        {user ? (
          <>
            <span style={styles.userName}>{user.user_name} さん</span>
            <button style={styles.logoutBtn} onClick={logout}>ログアウト</button>
          </>
        ) : (
          <>
            <span style={styles.guest}>👤ゲスト</span>
            <Link to="/login" style={styles.authLink}>ログイン</Link>
            <Link to="/register" style={styles.authLink}>新規登録</Link>
          </>
        )}
      </div>
    </header>
  );
}

const styles = {
  header: {
    background: "#4a90e2",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#fff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    fontFamily: "sans-serif",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
  logoLink: {
    color: "#fff",
    textDecoration: "none",
    transition: "transform 0.2s",
  },
  userArea: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  userName: {
    fontWeight: "bold",
  },
  logoutBtn: {
    padding: "5px 12px",
    background: "#fff",
    color: "#4a90e2",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.2s all",
  },
  guest: {
    opacity: 0.8,
  },
  authLink: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    border: "1px solid #fff",
    padding: "4px 10px",
    borderRadius: "6px",
    transition: "0.2s all",
  },
};
