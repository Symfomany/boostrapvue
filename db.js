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

app.get("/commune", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(`
      SELECT COUNT(code) FROM commune 
    `);
    res.json(rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
});

app.get("/deps", async (req, res) => {
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

app.get("/etablissements", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rowss = await conn.query(`
      SELECT etablissement_scolaire_id,code, nom, ligne1,telephone_fixe,telephone_mobile,email 
      FROM etablissement_scolaire 
      INNER JOIN adresse ON etablissement_scolaire.adresse_id = adresse.adresse_id
      INNER JOIN contact ON etablissement_scolaire.contact_id = contact.contact_id

    `);
    res.json(rowss);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
});

app.get("/etablissementsbydep/:cp", async (req, res) => {
  const cp = req.param("cp");

  let conn;
  try {
    conn = await pool.getConnection();
    let rowss = await conn.query(`
      SELECT nom, code_postal
      FROM etablissement_scolaire 
      INNER JOIN adresse ON etablissement_scolaire.adresse_id = adresse.adresse_id
      INNER JOIN commune ON commune.commune_id = adresse.commune_id
      WHERE LEFT(code_postal,2) = ${cp}
    `);
    rowss = rowss.map(elt => elt.nom + " (" + elt.code_postal + ")");
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
