const { Router } = require("express");
const router = Router();

const { Tipo } = require("../db.js");
const axios = require("axios");

// GET TYPES

router.get("/", async (req, res) => {
  const infoTypes = await axios.get("https://pokeapi.co/api/v2/type");
  const data = infoTypes.data.results;

  data.forEach((el) => {
    Tipo.findOrCreate({
      where: {
        name: el.name,
      },
    });
  });

  const infoTypesDb = await Tipo.findAll();

  res.status(200).json(infoTypesDb);
});

module.exports = router;
