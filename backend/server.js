const express = require("express");
const color = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorHandler");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000


connectDB()

const app = express();

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(errorHandler)

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the support desk API"
    })
})

//Routes
app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/tickets", require("./routes/ticketRoutes"))

//Error
app.use(errorHandler)


app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`.red.bold.underline))