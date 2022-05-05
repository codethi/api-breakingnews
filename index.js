require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDatabase = require("./src/database/database");
const userRoute = require("./src/routes/user.route");
const authRoute = require("./src/routes/auth.route");
const postRoute = require("./src/routes/post.route");
const swaggerRoute = require("./src/routes/swagger.route");

const port = process.env.PORT || 3001;
const app = express();

connectDatabase();
app.use(cors());
app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/posts", postRoute);
app.use("/doc", swaggerRoute);

app.listen(port, () => console.log(`Server running on port: ${port}`));
