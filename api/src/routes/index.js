const { Router } = require("express");

const pokemos = require("./pokemos.js");
const types = require("./types.js");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
//const axios = require('axios');

const router = Router();

router.use("/pokemons", pokemos);

router.use("/types", types);

//pokeCreatedDetail('45052b95-e498-41a2-b4bf-b2047b81faac');
//pokeDetailName("charmander");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
