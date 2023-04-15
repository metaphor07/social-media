const express = require("express");
const cors = require("cors");
const { default: helmet } = require("helmet");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const multer = require("multer");

const port = process.env.PORT || 5000;

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const conversationRoutes = require("./routes/conversations");
const messageRoutes = require("./routes/messages");

// Database connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database Connection Successful...");
  })
  .catch((error) => {
    console.log(`DB error is: ${error}`);
  });

//   middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

// routes of the api
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);

app.listen(port, () => {
  console.log(`Running on Port no. ${port}`);
});
