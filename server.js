// server.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

const userDBPath = './data/users.json';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your@gmail.com', // change to your Gmail
    pass: 'your-app-password' // use Gmail App Password
  }
});

function loadUserData() {
  const data = fs.readFileSync(userDBPath);
  return JSON.parse(data);
}

app.post('/login', (req, res) => {
    app.post('/join', (req, res) => {
  const { name, email, password, skill, learn } = req.body;

  // Load current users
  let users = {};
  try {
    users = JSON.parse(fs.readFileSync(userDBPath));
  } catch (err) {
    console.error("Error reading users.json:", err);
  }

  if (users[email]) {
    return res.status(409).send("User already exists");
  }

  // Add new user
  users[email] = {
    name,
    email,
    password,
    skill,
    learn
  };

  // Save to users.json
  fs.writeFileSync(userDBPath, JSON.stringify(users, null, 2));
  res.status(200).send("User registered successfully");
});

  const { email, password } = req.body;
  const users = loadUserData();
  const user = users[email];

  if (user && user.password === password) {
    const mailOptions = {
      from: 'your@gmail.com',
      to: email,
      subject: 'Welcome to SwapSkill 🚀',
      html: `
        <h2>Hey ${user.name} 👋</h2>
        <p>Here’s your info:</p>
        <ul>
          <li><strong>Skill to Share:</strong> ${user.skill}</li>
          <li><strong>Skill to Learn:</strong> ${user.learn}</li>
        </ul>
        <p>Welcome aboard SwapSkill ✨</p>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return res.status(500).send('Email failed');
      return res.status(200).send('Login success. Email sent!');
    });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
