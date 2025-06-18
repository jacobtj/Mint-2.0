const express = require('express');
const router = express.Router();

const {
  getSummary,
  getSpendingByCategory,
} = require('../controllers/analytics');

// Route: GET /api/analytics/summary
router.get('/summary', async (req, res) => {
  try {
    const month = req.query.month; // "2024-05"

    if (!month) {
      return res.status(400).json({ error: 'Month query parameter is required' });
    }

    const data = await getSummary(month);
    res.json(data);
  } catch (err) {
    console.error('Error getting summary:', err);
    res.status(500).send('Failed to fetch summary analytics');
  }
});

// Route: GET /api/analytics/category-spending
router.get('/category-spending', async (req, res) => {
  try {
    const month = req.query.month;

    if (!month) {
      return res.status(400).json({ error: 'Month query parameter is required' });
    }

    const data = await getSpendingByCategory(month);
    res.json(data);
  } catch (err) {
    console.error('Error getting category spending:', err);
    res.status(500).send('Failed to fetch category spending');
  }
});

module.exports = router;
