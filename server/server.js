const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/api/email_send', (req, res) => {

  console.log(req.body);

  /*let transporter = nodemailer.createTransport(
    {
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    }
  );

  let message = {
    from: process.env.EMAIL,
    to: req.body.members,
    subject: 'New comment',
    html: `<h4>Hello,</h4><p>&nbsp;&nbsp;&nbsp;Someone added a comment on an article.</p>`
  };

  transporter.sendMail(message, (error, info) => {
    if(error) {
      console.log(error.message);
      return process.exit(1);
    }
  });*/

  res.status(200).json({
    email: 'email was sent from server',
  });
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
