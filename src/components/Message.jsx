export default function Message({ type = "info", text }) {
  if (!text) return null;

  return (
    <p style={{ ...styles.base, ...styles[type] }}>
      {text}
    </p>
  );
  
}
  const styles = {
    base: {
      width:"56%",
      textAlign:"left",
      fontSize:"12px",
      marginTop: "15px",
      padding: "10px",
      borderRadius: "6px",
      fontWeight: "bold",
      whiteSpace: "pre-line",
    },
    info: {
      background: "#e7f3ff",
      color: "#3178c6",
    },
    error: {
      background: "#ffe7e7",
      color: "#c63131",
    },
    success: {
      background: "#e7ffe7",
      color: "#28a745",
    },
  };
