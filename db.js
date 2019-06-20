/**
 * https://mariadb.com/kb/en/library/connector-nodejs-promise-api/
 *
 */
const express = require("express");
const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "fcpe",
  connectionLimit: 5
});
const app = express();

app.get("/", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rowss = await conn.query("SELECT COUNT(code) as nb FROM foyer");
    console.log(rowss);
    res.json(rowss);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
