const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all transactions
router.get('/', (req, res) => {
  const sortBy = req.query.sortBy;
  let query = 'SELECT * FROM transactions';
  if (sortBy === 'date') query += ' ORDER BY date DESC';
  else if (sortBy === 'amount') query += ' ORDER BY amount DESC';

  const rows = db.prepare(query).all();
  res.json(rows);
});

// Add a new transaction
router.post('/', (req, res) => {
  const { description, category, amount, date } = req.body;
  const stmt = db.prepare(`
    INSERT INTO transactions (description, category, amount, date)
    VALUES (?, ?, ?, ?)
  `);

  const info = stmt.run(description, category, amount, date);

  res.json({ id: info.lastInsertRowid, description, category, amount, date });
});

// Delete a transaction by ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const stmt = db.prepare('DELETE FROM transactions WHERE id = ?');
  const info = stmt.run(id);

  if (info.changes === 0) {
    res.status(404).json({ error: 'Transaction not found' });
  } else {
    res.json({ success: true, deletedId: id });
  }
});

module.exports = router;
