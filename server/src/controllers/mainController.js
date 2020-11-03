// local dependencies
const db = require('../db');

module.exports = {
  async loadMessages (req, res, next) {
    const { room } = req.params;
    const sql = 'SELECT * FROM messages WHERE room = $1 ORDER BY date DESC LIMIT 50;';
    const params = [room];
    try {
      // execute database query
      const { rows } = await db.query(sql, params);
      res.json(rows.sort((a,b) => a.date - b.date));
    } catch (err) {
      next(err);
    }
  }
};
