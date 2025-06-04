const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const transactionRoutes = require('./routes/transactions');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());                     // Allow cross-origin requests, switch to below statement in production

/*
app.use(cors({
  origin: 'https://mint-2-0.vercel.app/'  
}));
*/

app.use(bodyParser.json());          // Parse JSON request bodies

// API Routes
app.use('/api/transactions', transactionRoutes);

// Root health check
app.get('/', (req, res) => {
  res.send('Mint 2.0 backend is running.');
});

// Start server
app.listen(PORT, () => {
  console.log(`?? Server is running at http://localhost:${PORT}`);
});








/*
const PORT = 8000;
var express = require('express');
var app = express();
const db = require('better-sqlite3')('budget.db');
const cors = require('cors');
app.use(cors());

app.get('/', function (req, res) {
  res.json('Backend Home');
})
  
app.get('/transactions', (req, res) => {
  const query1 = 'SELECT * from transactions ORDER BY amount ASC';
  const transactions = db.prepare(query1).all();
  res.json(transactions);
  //db.exec(query1);
})

app.get('/summary', (req, res) => {
  const query2 = 'SELECT sum(amount), source from transactions group by source';
  const summary = db.prepare(query2).all();
  res.json(summary);
})

app.listen(PORT, () => console.log('Backend listening on port 8000'))
*/