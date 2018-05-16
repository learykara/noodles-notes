const express = require('express');
const Sendmail = require('sendmail');

const app = express();
const port = process.env.PORT || 8080;
const mailer = Sendmail();

app.use('/static', express.static(`${__dirname}/public`));
app.engine('html', require('ejs').renderFile);
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index.html');
});

app.post('/send-email', (req, res) => {
  const { content } = req.body;
  mailer({
    from: 'hello@noodlesnotes.com',
    to: 'learykara@gmail.com',
    subject: 'New contact from noodlesnotes.com',
    html: content,
  }, (err, reply) => {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      console.dir(reply);
      res.status(200).end();
    }
  });
});

const server = app.listen(port, () => {
  const host = server.address().address;
  console.log('App listening at http://%s:%s', host, port);
});
