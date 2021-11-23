const { Router } = require('express');
const router = Router();

const{ Tipo }= require('../db.js')
const axios = require('axios');
const { getOnlyPokeApi } = require('../functions/functions.js')





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

    res.send(infoTypesDb);
  });





  module.exports = router;