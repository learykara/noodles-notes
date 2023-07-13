const express = require('express');
const Sendmail = require('sendmail');

const app = express();
const port = process.env.PORT || 8080;
const mailer = Sendmail();

const STORIES = require('./src/stories.js');

app.use('/static', express.static(`${__dirname}/public`));
app.engine('html', require('ejs').renderFile);
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('/sea-stories', (req, res) => {
  res.render('sea_stories.html', {
    foo: 'BARFOO',
    stories: STORIES,
  });
});

app.post('/send-email', (req, res) => {
  const { content } = req.body;
  mailer(
    {
      from: 'hello@noodlesnotes.com',
      to: 'cibrewery@gmail.com',
      subject: 'New contact from noodlesnotes.com',
      html: content,
    },
    (err, reply) => {
      if (err) {
        console.log(err);
        res.status(500).end();
      } else {
        console.dir(reply);
        res.status(200).end();
      }
    }
  );
});

app.get('/static/noodles_notes.pdf', (req, res) => {
  res.status(303).redirect('/');
});

const server = app.listen(port, () => {
  const host = server.address().address;
  console.log('App listening at http://%s:%s', host, port);
});
