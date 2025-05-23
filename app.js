require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

const indexRoutes = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoutes);

mongoose.connect('mongodb+srv://salmancheema528:zAIBeLdxqw1Um7h1@cluster0.hsubwdd.mongodb.net/budgetapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  app.listen(3001, () => {
    console.log(`Server running at http://localhost:${3001}`);
  });
})
.catch(err => console.error(err));
