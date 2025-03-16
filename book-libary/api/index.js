const express = require('express');
const cors = require('cors');
const bookData = require('./data/bookData.json');

const app = express();

app.use(cors());

function getRandomBook() {
  const randomIndex = Math.floor(Math.random() * bookData.length);
  const randomBook = bookData[randomIndex];
  return randomBook;
}

app.get('/random-book', (req, res) => {
  res.json(getRandomBook());
});

app.get('/random-book-delayed', (req, res) => {
  //delayed uses for await for example 2 second
  setTimeout(() => {
    res.json(getRandomBook());
  }, 2000);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
