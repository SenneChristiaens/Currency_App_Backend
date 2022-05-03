const express = require('express');
const transactionsRouter = require('./routers/transactions');
const mongoose = require('mongoose');
// const cors = require('cors');
mongoose.connect('mongodb://localhost:27017/');
// mongoose.connect('mongodb+srv://admin:admin@cluster0.flad1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');


const app = express();
const port = 3000;
app.set('view engine', 'html');

// app.use(cors())
app.use(express.json());
app.use("/api/v1/transactions", transactionsRouter);
app.use("/api/v1/users", transactionsRouter);

//REST
app.get('/', (req, res) => {
    res.render('index', {title: "Currency app", message: "Front end"});
  });
  
// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
//   });
app.listen(process.env.PORT || port);