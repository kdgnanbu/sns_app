import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const navItems = [
    { path: "/home", label: "🏠 ホーム" },
    { path: "/likes", label: "❤️ いいね" },
    { path: "/settings", label: "⚙ 設定" },
  ];

  return (
    <footer style={styles.footer}>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          style={{
            ...styles.link,
            color: location.pathname === item.path ? "#cce4ffff" : "#fbfbfbff",
          }}
        >
          {item.label}
        </Link>
      ))}
    </footer>
  );
}

const styles = {
  footer: {
    background: "#4a90e2",
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "20px 0",
    borderTop: "1px solid #ccc",
    boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
    zIndex: 1000,
  },
  link: {
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
  },
};
