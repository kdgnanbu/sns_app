export default function AuthLayout({ children }) {
  return (
    <div style={styles.container}>
      <div style={styles.page}>
        {children}
      </div>
    </div>
  );
}

const styles = {
  container: {
    margin:"50px 40px 100px 40px",
    fontFamily: "sans-serif",
    background: "#f5f8fa",
  },
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
    maxWidth: "500px",
    margin: "auto",
    paddingBottom: "5vh"
  }
};
