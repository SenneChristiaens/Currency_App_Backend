const express = require('express');
const transactionsRouter = require('./routers/transactions');
const mongoose = require('mongoose');
const cors = require('cors');
// mongoose.connect('mongodb://localhost:27017/');
// mongoose.connect('mongodb+srv://admin:admin@cluster0.flad1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
// mongoose.connect('mongodb+srv://admin:QGlzn6kVrqwk9ZpP@lab5.rnlkz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
// mongoose.connect('mongodb+srv://admin:QGlzn6kVrqwk9ZpP@lab5.rnlkz.mongodb.net/CurrencyApp?retryWrites=true&w=majority');
// mongoose.connect('mongodb+srv://BramColleman:admin@lab5.rnlkz.mongodb.net/transactions?retryWrites=true&w=majority');
// mongoose.connect('mongodb+srv://BramColleman:admin@lab5.rnlkz.mongodb.net/currencyapp?retryWrites=true&w=majority');
// mongoose.connect('mongodb+srv://admin:admin@cluster0.flad1.mongodb.net/currencyApp?retryWrites=true&w=majority');
mongoose.connect('mongodb+srv://admin:admin@backend.flad1.mongodb.net/currencyapp?retryWrites=true&w=majority');

const app = express();
const port = 3000;
// app.set('view engine', 'html');
app.set('view engine', 'pug');

app.use(cors());
app.use(express.json());
app.use("/api/v1/transactions", transactionsRouter);
// app.use("/api/v1/users", transactionsRouter);

//REST
app.get('/', (req, res) => {
    res.render('index', {title: "Currency app", message: "Front end"});
  });
  

app.listen(process.env.PORT || port);