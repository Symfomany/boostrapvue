/**
 * https://mariadb.com/kb/en/library/connector-nodejs-promise-api/
 *
 */
const express = require("express");
const mariadb = require("mariadb");
const cors = require("cors");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "fcpe",
  connectionLimit: 5
});
const app = express();

app.use(cors());

app.get("/etablissements", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rowss = await conn.query(`
      SELECT etablissement_scolaire_id,code, nom FROM etablissement_scolaire 
    `);
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
