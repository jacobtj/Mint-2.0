const pool = require('../db');

// Get income, expenses, and net balance
async function getSummary(month) {
  try {
    const result = await pool.query(`
      SELECT
        SUM(CASE WHEN c.type = 'income' THEN t.amount ELSE 0 END) AS total_income,
        SUM(CASE WHEN c.type = 'expense' THEN t.amount ELSE 0 END) AS total_expenses,
        SUM(CASE WHEN c.type = 'income' THEN t.amount ELSE -t.amount END) AS net_change
      FROM transactions t
      JOIN categories c ON t.category_id = c.id
      WHERE TO_CHAR(t.date, 'YYYY-MM') = $1
    `, [month]);
    return result.rows[0];
  } catch (err) {
    console.error('Error fetching summary:', err);
  }
}

// Get total expenses grouped by category
async function getSpendingByCategory(month) {
  try {
    const result = await pool.query(`
      SELECT c.name AS category, SUM(t.amount) AS amount
        FROM transactions t
        JOIN categories c ON t.category_id = c.id
        WHERE TO_CHAR(t.date, 'YYYY-MM') = $1
        GROUP BY c.name
      ORDER BY amount DESC
    `, [month]);
    return result.rows;
  } catch (err) {
    console.error('Error fetching summary:', err);
  }
}

module.exports = {
  getSummary,
  getSpendingByCategory,
};
