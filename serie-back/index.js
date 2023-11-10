const express = require("express");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const connection = require("./database");
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "/upload"));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
  limits: {
    fileSize: 10000000,
  },
  fileFilter: (req, file, cb) => {
    console.log(file);
    cb(null, true);
  },
});

const app = express();
app.use(express.static(path.join(__dirname, "upload")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const port = 8000;

require("./database");

const routes = require("./routes");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(routes);

app.post("/register", upload.single("avatar"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  let avatar;
  if (req.file === undefined) {
    avatar = null;
  } else {
    avatar = req.file.filename;
  }
  const { username, email, password } = req.body;
  const sqlVerify = "SELECT * FROM users WHERE email= ?";
  const hashedPassword = await bcrypt.hash(password, 10);
  connection.query(sqlVerify, [email], (err, result) => {
    if (err) throw err;
    if (result.length) {
      let isEmail = { message: "Email existant" };
      if (avatar) {
        const filePath = path.join(__dirname, "/upload", avatar);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log("Erreur suppression fichier");
          }
          console.log("Fichier supprimé");
        });
      }
      res.status(200).json(isEmail);
    } else {
      const sqlInsert =
        "INSERT INTO users (pseudo, email, password, avatar) VALUES (?, ?, ?, ?)";
      connection.query(
        sqlInsert,
        [username, email, hashedPassword, avatar],
        (err, result) => {
          if (err) throw err;
          let isEmail = {
            messageGood: "Inscription réussie ! Vous allez être redirigé(e)",
          };
          res.status(200).json(isEmail);
        }
      );
    }
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sqlVerifyMail = "Select idUser, password, admin FROM users WHERE email=?";
  connection.query(sqlVerifyMail, [email], async (err, result) => {
    if (err) throw err;
    let isEmail;
    if (result.length === 0) {
      isEmail = { message: "Email et/ou mot de passe incorrects !" };
    } else {
      const dbPassword = result[0].password;
      const passwordMatch = await bcrypt.compare(password, dbPassword);
      if (passwordMatch) {
        isEmail = {
          messageGood: "Connexion réussie ! Vous allez être redirigé(e)",
          id: result[0].idUser,
          admin: result[0].admin
        };
      } else {
        isEmail = { message: "Email et/ou mot de passe incorrects !" };
      }
    }
    res.status(200).json(isEmail);
  });
});

app.get("/getUser/:id", (req, res) => {
  console.log(req.params);
  let id = req.params.id;
  const sql = "SELECT pseudo, email, avatar FROM users where id= ?";
  connection.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.status(200).json(result[0]);
  });
});

app.get("/getSeries", (req, res) => {
  const sql = "SELECT * FROM series";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Séries récupérées");
    res.json(result);
  });
});

app.post("/addSerie", upload.single("poster"), async (req, res) => {
  let poster;
  if (req.file === undefined) {
    poster = null;
  } else {
    poster = req.file.filename;
  }
  const { title, year, resume, numberSeason, still, imdbNote, sensCritiqueNote, country } = req.body;
  const sqlVerify = "SELECT * FROM series WHERE title= ?";
  connection.query(sqlVerify, [title], (err, result) => {
    if (err) throw err;
    if (result.length) {
      let isTitle = { message: "Titre déjà existant" };
      if (poster) {
        const filePath = path.join(__dirname, "/upload");
        fs.unlink(filePath, (err) => { 
          if (err) {
            console.log("Erreur suppression fichier");
          }
          console.log("Fichier supprimé");
        });
      }
      res.status(200).json(isTitle);
    } else {
      const sqlInsert =
        "INSERT INTO series (title, poster, year, resume, numberSeason, still, imdbNote, sensCritiqueNote, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      connection.query(
        sqlInsert,
        [title, poster, year, resume, numberSeason, still, imdbNote, sensCritiqueNote, country],
        (err, result) => {
          if (err) throw err;
          let isTitle = {
            messageGood: "Ajout réussie !",
          };
          res.status(200).json(isTitle);
        }
      );
    }
  });
});

app.delete("/deleteSeries", (req, res) => {
  const { idSerie } = req.body;
  const sqlDelete = "DELETE FROM series WHERE idSerie = ?";
  connection.query(sqlDelete, idSerie, (err, result) => {
    if (err) throw err;
    console.log("Série effacée");
    res.status(200).json({ message: "Delete ok"});
  });
});

app.listen(port, () => {
  console.log(`Serveur écoutant sur le port ${port}`);
});
