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

// router.post("/addSerie", upload.single("poster"), async (req, res) => {
//   let poster;
//   if (req.file === undefined) {
//     poster = null;
//   } else {
//     poster = req.file.filename;
//   }
//   const { title, year, resume, numberSeason, still, imdbNote, sensCritiqueNote, country } = req.body;
//   const sqlVerify = "SELECT * FROM series WHERE title= ?";
//   connection.query(sqlVerify, [title], (err, result) => {
//     if (err) throw err;
//     if (result.length) {
//       let isTitle = { message: "Titre déjà existant" };
//       if (poster) {
//         const filePath = path.join(__dirname, "/upload");
//         fs.unlink(filePath, (err) => { 
//           if (err) {
//             console.log("Erreur suppression fichier");
//           }
//           console.log("Fichier supprimé");
//         });
//       }
//       res.status(200).json(isTitle);
//     } else {
//       const sqlInsert =
//         "INSERT INTO series (title, poster, year, resume, numberSeason, still, imdbNote, sensCritiqueNote, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
//       connection.query(
//         sqlInsert,
//         [title, poster, year, resume, numberSeason, still, imdbNote, sensCritiqueNote, country],
//         (err, result) => {
//           if (err) throw err;
//           let isTitle = {
//             messageGood: "Ajout réussie !",
//           };
//           res.status(200).json(isTitle);
//         }
//       );
//     }
//   });
// });

// router.delete("/deleteSeries", (req, res) => {
//   const { id } = req.body;
//   const sqlLike = "DELETE FROM series WHERE id = ?";
//   connection.query(sqlLike, id, (err, result) => {
//     if (err) throw err;
//     console.log("Série effacée");
//     res.status(200).json({ message: "Delete ok"});
//   });
// });

module.exports = router;
