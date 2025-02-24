const express = require("express");
const { handleGenerateNewShortURL } = require("../controllers/url");
const router = express.Router();



router.post("/url", handleGenerateNewShortURL);





module.exports = router;