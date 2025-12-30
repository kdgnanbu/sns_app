const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const loginRoute = require("./routes/login");
app.use("/api/posts", postsRoute);
app.use("/api/users", usersRoute);
app.use("/api/login", loginRoute);

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
