export default function AuthForm({
  isRegister = false,
  userName,
  setUserName,
  userMail,
  setUserMail,
  userPass,
  setUserPass,
  title = "",
  children =""
}) {
  return (
    <div>
      <h2 style={styles.title}>{title}</h2>
      {isRegister && (
        <div style={styles.formGroup}>
          <label style={styles.label}>名前:</label>
          <input
            type="text"
            style={styles.input}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="山田太郎"
          />
        </div>
      )}

      <div style={styles.formGroup}>
        <label style={styles.label}>メールアドレス:</label>
        <input
          type="email"
          style={styles.input}
          value={userMail}
          onChange={(e) => setUserMail(e.target.value)}
          placeholder="example@gmail.com"
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>{children}パスワード:</label>
        <input
          type="password"
          style={styles.input}
          value={userPass}
          onChange={(e) => setUserPass(e.target.value)}
          placeholder={`${children}パスワード`}
        />
      </div>
    </div>
  );
}

const styles = {
  formGroup: {
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
  },
  label: {
    width: "120px",
    fontSize: "14px",
    fontWeight: "bold",
    marginRight: "10px",
    textAlign: "right",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
  },
    title: {
    marginBottom: "20px",
  }
};
