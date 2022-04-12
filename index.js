require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDatabase = require("./src/database/database");
const userRoute = require("./src/user/user.route");
const authRoute = require("./src/auth/auth.route");
const postRoute = require("./src/posts/post.route");

const port = process.env.PORT || 3000;
const app = express();

connectDatabase();
app.use(cors());
app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/post", postRoute);

app.listen(port, () => console.log(`Server running on port: ${port}`));
