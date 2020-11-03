module.exports = {
  pgPool: {
    host         : process.env.DB_HOST || "192.168.2.10",
    port         : process.env.DB_PORT || 5432,
    database     : process.env.DB_DB   || "chatt3r",
    user         : process.env.DB_USER,
    password     : process.env.DB_PASSWD
  }
};
