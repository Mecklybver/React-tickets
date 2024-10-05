const express = require("express");
const color = require("colors");
const dotenv = require("dotenv").config();
const path = require("path");
const { errorHandler } = require("./middleware/errorHandler");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the support desk API",
  });
});

//Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));

//Serve frontent
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.status(200).json({
      message: "Welcome to the support desk API",
    });
  });
}

//Error
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server started on PORT ${PORT}`.red.bold.underline)
);
