const express = require("express");
const color = require("colors");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 5000

const app = express();

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the support desk API"
    })
})

//Routes
app.use("/api/users", require("./routes/userRoutes"))

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`.red.bold.underline))