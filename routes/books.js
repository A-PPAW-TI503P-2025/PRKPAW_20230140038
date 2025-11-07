const express = require('express');
const router = express.Router();

let books = [
  { id: 1, title: 'Mein Kamf', author: 'Adolf Hitler' },
  { id: 2, title: 'How to Be Sigma', author: 'SigmaMale69' },
];

router.get('/', (req, res) => {
  res.json(books);
});

router.get('/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

router.post('/', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required' });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

module.exports = router;
