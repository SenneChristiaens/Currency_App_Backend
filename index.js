const express = require("express");
const transactionsRouter = require("./routers/transactions");
const usersRouter = require("./routers/users");
const mongoose = require("mongoose");
const cors = require("cors");
// mongoose.connect('mongodb://localhost:27017/');
mongoose.connect(
  "mongodb+srv://admin:admin@backend.flad1.mongodb.net/currencyapp?retryWrites=true&w=majority"
);

const app = express();
const port = 3001;
// app.set('view engine', 'html');
app.set("view engine", "pug");

app.use(cors());
app.use(express.json());
app.use("/api/v1/transactions", transactionsRouter);
app.use("/api/v1/users", usersRouter);

//REST
app.get("/", (req, res) => {
  res.render("index", { title: "Currency app", message: "Front end" });
});

app.listen(process.env.PORT || port);
