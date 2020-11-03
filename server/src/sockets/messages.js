// local dependencies
const db = require('../db');

async function formatMessage (username, content, room) {
  const date = Date.now();
  const sql = 'INSERT INTO messages (sender, room, date, content) VALUES ($1, $2, $3, $4) RETURNING id';
  try {
    // execute database query
    const { err, rows } = await db.query (sql, [ username, room, date, content ]);
    if (err) throw new Error('DB ERROR');
    const message = {
      id: rows[0].id,
      sender: username,
      room,
      content,
      date: date.toString()
    };
    return message;
    } catch (err) {
      console.log(err.message);
    }
}

module.exports = formatMessage;
