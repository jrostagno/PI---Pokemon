const { Router } = require("express");
const { Pokemon, Tipo } = require("../db.js");

const {
  pokemonDetail,

  getAllPokemons,
} = require("../functions/functions.js");

const router = Router();

// OBTENER POKEMON POR ID ,

router.get("/:idPokemon", async (req, res) => {
  const { idPokemon } = req.params;

  try {
    if (idPokemon.length < 5) {
      const detail = await pokemonDetail(idPokemon);

      detail
        ? res.status(200).send(detail)
        : res.status(404).send("Pokemon Not found");
    } else {
      const pokemon = await Pokemon.findOne({
        where: { id: idPokemon },
        include: {
          model: Tipo,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });

      const pokemonId = {
        id: pokemon.dataValues.id,
        name: pokemon.dataValues.name,
        hp: pokemon.dataValues.hp,
        strength: pokemon.dataValues.strength,
        defense: pokemon.dataValues.defense,
        speed: pokemon.dataValues.speed,
        height: pokemon.dataValues.height,
        weight: pokemon.dataValues.weight,
        image: "https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif",
        types: pokemon.dataValues.Tipos.map((el) => el.name),
      };

      pokemonId.id
        ? res.status(200).send(pokemonId)
        : res.status(404).send("Pokemon Not Found");
    }
  } catch (err) {
    console.log(err);
    return {};
  }
});

// RUTA GETT

router.get("/", async (req, res) => {
  const { name } = req.query;

  try {
    let pokemons = await getAllPokemons();

    if (name) {
      let pokeName = await pokemons.filter(
        (el) => el.name.toLowerCase().trim() === name.toLowerCase().trim()
      );
      pokeName.length
        ? res.status(200).send(pokeName)
        : res.status(200).json([]);
    } else {
      res.status(200).send(pokemons);
    }
  } catch (err) {
    console.log(err);
  }
});

// POST

router.post("/", async (req, res) => {
  try {
    const {
      name,
      hp,
      strength,
      defense,
      speed,
      height,
      weight,
      type,
      createInDataBase,
    } = req.body;

    if (!name) return res.status(404).send("Name is a mandatory!");

    let pokemonCreated = await Pokemon.create({
      name: name.trim(),
      hp,
      strength,
      defense,
      speed,
      height,
      weight,
      createInDataBase,
    });

    let typeDb = await Tipo.findAll({
      where: { name: type },
    });

    pokemonCreated.addTipo(typeDb);

    res.status(200).send("Pokemon created successfully");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
