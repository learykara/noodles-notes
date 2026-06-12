const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

const STORIES = require('./src/stories.js');

// Middleware
app.use('/static', express.static(path.join(__dirname, 'public')));
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('/sea-stories', (req, res) => {
  res.render('sea_stories.html', {
    stories: STORIES,
  });
});

app.get('/static/noodles_notes.pdf', (req, res) => {
  res.status(303).redirect('/');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const server = app.listen(port, () => {
  const host = server.address().address || 'localhost';
  console.log(`App listening at http://${host}:${port}`);
});
