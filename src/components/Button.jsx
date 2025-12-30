export default function Button({ children, onClick, color = "blue", style = {} }) {
  
  const baseStyle = {
    width: "60%",
    padding: "12px",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
    background: "#4a90e2",
    ...style,
  };

  const colorMap = {
    blue: "#4a90e2",
    green: "#4CAF50",
    red: "#E53935",
    gray: "#9e9e9e"
  };
    if (color === "gray") {
    baseStyle.width = "30%";
    baseStyle.padding = "8px 12px";
    baseStyle.marginTop = "15px";
  }

  baseStyle.background = colorMap[color] || colorMap.blue;

  return (
    <button style={baseStyle} onClick={onClick}>
      {children}
    </button>
  );
}
