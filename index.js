const express = require('express');
const Sendmail = require('sendmail');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;
const mailer = Sendmail();

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

app.post('/send-email', (req, res) => {
  const { content } = req.body;
  
  if (!content || !content.trim()) {
    return res.status(400).json({ error: 'Content is required' });
  }

  mailer(
    {
      from: 'hello@noodlesnotes.com',
      to: 'cibrewery@gmail.com',
      subject: 'New contact from noodlesnotes.com',
      html: content.trim(),
    },
    (err, reply) => {
      if (err) {
        console.error('Email error:', err);
        return res.status(500).json({ error: 'Failed to send email' });
      }
      console.log('Email sent:', reply);
      res.status(200).json({ success: true });
    }
  );
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
