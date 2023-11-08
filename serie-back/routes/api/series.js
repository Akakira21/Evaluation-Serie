const router = require("express").Router();

const connection = require("../../database");

router.get("/getSeries", (req, res) => {
  const sql = "SELECT * FROM series";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Séries récupérées");
    res.json(result);
  });
});

module.exports = router;
