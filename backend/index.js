const express = require("express");
const app = express();

const database = require("./database/connection");
const errorMiddleware = require("./middleware/error");
const userRoute = require("./routes/userRoute");
const projectRoute = require("./routes/projectRoute");
const path = require("path");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 8000;

const cors = require("cors");

app.use(cors());

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// App Methods
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/project", projectRoute);



// Middleware for error
app.use(errorMiddleware);

const server = app.listen(PORT, () => {
  console.log(`Backend is running ar port 8000`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
