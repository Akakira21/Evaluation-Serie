const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "eval_serie",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connecté à la base de données");
});

module.exports = connection;
