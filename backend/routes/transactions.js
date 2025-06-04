const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all transactions
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM transactions');
    res.json(result.rows)
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching transactions');
  }
});

// Add a new transaction
router.post('/', async (req, res) => {
  const { description, amount, date, category_id } = req.body;

  if (!description || !amount || !date || !category_id) {
    return res.status(400).send('Missing required fields');
  }

  try {
    const result = await pool.query(
      'INSERT INTO transactions (description, amount, date, category_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [description, amount, date, category_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding transaction');
  }
});

// Delete a transaction by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM transactions WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).send('Transaction not found');
    }

    res.json(result.rows[0]); // You could also just send a 204 No Content
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting transaction');
  }
});

module.exports = router;
