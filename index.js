const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/form.html');
});

app.get('/confirmation.html', (req, res) => {
    res.sendFile(__dirname + '/confirmation.html');
  });

app.post('/submit', (req, res) => {
  const { name, phone, email, agreement } = req.body;

  if (!agreement) {
    res.send('please accept rule and agreement');
    return;
  }


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-password'
    }
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'hr@example.com',
    subject: 'information form - information',
    html: `
      <h2>information form - information</h2>
      <p><strong>Name-Surname:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('error for send mail');
    } else {
      console.log('email has send to HR');
      res.redirect('/confirmation');
    }
  });
});

app.listen(5500, () => {
  console.log('server Node.js port 5500');
});