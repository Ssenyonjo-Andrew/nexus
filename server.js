// server.js
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'biogas_db',
});

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.execute('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
  res.status(201).json({ message: 'User created' });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  if (users.length > 0) {
    const user = users[0];
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      res.json({ user: { id: user.id, email: user.email } });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));