const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const bookRoutes = require('./routes/books');
app.use('/api/books', bookRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
