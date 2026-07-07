require("dotenv").config();
const express = require("express");
const cors = require("cors")
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const User = require("./models/User");
// const { registerUser } = require("./controllers/authController");
const app = express();
connectDB();

app.use(logger);
app.use(cors({
  origin: [
    "http://localhost:5501",
    "https://glittery-maamoul-bd779e.netlify.app"
  ]
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 5000;

function logger(req, res, next) {
  console.log("Middleware executed");
  next();
}

app.get("/",(req, res) => {
  res.send("Backend Running 🚀");
});

app.get("/about",(req,res)=>{
    res.send("this is about page ");

});


// POST
app.post("/register", (req, res) => {

    console.log(req.body);

    res.json({
        message: "Data Received",
        data: req.body
    });

});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});