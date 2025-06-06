const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET categories
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching categories');
  }
});

// POST categories
router.post('/', async (req, res) => {
  const { name, type } = req.body;

  if (!name || !type) {
    return res.status(400).send('Missing required fields');
  }

  try {
    const result = await pool.query(
      'INSERT INTO categories (name, type) VALUES ($1, $2) RETURNING *',
      [name, type]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding category');
  }
});

// DELETE categories
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM categories WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).send('Category not found');
    }

    res.json(result.rows[0]); // You could also just send a 204 No Content
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting category');
  }
});

module.exports = router;