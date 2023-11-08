const router = require("express").Router();
const apiSeries = require("./series");

router.use("/series", apiSeries);

module.exports = router;
