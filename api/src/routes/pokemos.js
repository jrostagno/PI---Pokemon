const { Router } = require("express");
const { Pokemon, Tipo } = require("../db.js");
const axios = require("axios");
const {
  pokeDetailName,
  pokemonDetail,

  getAllPokemons,
} = require("../functions/functions.js");

const router = Router();

// OBTENER POKEMON POR ID ,

router.get("/:idPokemon", async (req, res) => {
  // console.log("ENTROOOOOOO ", req);
  const { idPokemon } = req.params;

  try {
    if (idPokemon.length < 5) {
      const detail = await pokemonDetail(idPokemon);
      // console.log('ENTREO LINEA 17')
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

// PRUEBA

// router.get("/:idPokemon", async (req, res) => {
//   try {
//     const { idPokemon } = req.params;

//     const pokemons = await getAllPokemons();

//     for (let i = 0; i < pokemons.length; i++) {
//       if (pokemons[i].id === idPokemon)
//         return res.status(200).send(pokemons[i]);
//     }

//     const poke = await pokemonDetail(idPokemon);
//     poke
//       ? res.status(200).send(poke)
//       : res.status(404).send("Pokemon Not Found");
//   } catch (error) {
//     console.log(error);
//     res.status(404).send(error);
//   }
// });

// // POKEMONS POR QUERY   / POKEMOSN TODOS
// router.get("/", async (req, res) => {
//   const { name } = req.query;

//   const pokemons = await getAllPokemons();

//   if (!name) return res.status(200).send(pokemons);

//   if (name) {
//     for (let i = 0; i < pokemons.length; i++) {
//       if (pokemons[i].name.trim().toLowerCase() === name.trim().toLowerCase()) {
//         return res.status(200).send(pokemons[i]);
//       }
//     }
//     return res.status(404).send("Pokemon Not Found MY Friend...");
//   }
// });

// prueba GET

// router.get("/", async (req, res) => {
//   const { name } = req.query;

//   if (name) {
//     const poke = await pokeDetailName(name.toLowerCase());

//     if (poke) return res.send(poke);
//   } else {
//     const pokemon = await Pokemon.findOne({
//       where: { name: name },
//       include: {
//         model: Tipo,
//         attributes: ["name"],
//         through: {
//           attributes: [],
//         },
//       },
//     });

//     const pokemonName = {
//       id: pokemon.dataValues.id,
//       name: pokemon.dataValues.name,
//       hp: pokemon.dataValues.hp,
//       strength: pokemon.dataValues.strength,
//       defense: pokemon.dataValues.defense,
//       speed: pokemon.dataValues.speed,
//       height: pokemon.dataValues.height,
//       weight: pokemon.dataValues.weight,
//       image: "https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif",
//       type: pokemon.dataValues.Tipos.map((el) => el.name),
//     };

//     pokemonName.id
//       ? res.status(200).send(pokemonName)
//       : res.status(404).send("Pokemon Not Found");
//   }

//   let pokemons = await getAllPokemons();

//   return res.status(200).send(pokemons);
// });

// RUTA GETT

router.get("/", async (req, res) => {
  const { name } = req.query;

  let pokemons = await getAllPokemons();

  if (name) {
    let pokeName = await pokemons.filter(
      (el) => el.name.toLowerCase().trim() === name.toLowerCase().trim()
    );
    pokeName.length ? res.status(200).send(pokeName) : res.status(200).json([]);
  } else {
    res.status(200).send(pokemons);
  }
});

// PRUEBA MEJORA RUTA GET

// router.get("/", async (req, res) => {
//   const { name } = req.query;

//   let pokemons = await getAllPokemons();

//   if (!name) return res.status(200).send(pokemons);

//   if (name) {
//     try {
//       const poke = await pokeDetailName(name);

//       if (poke) {
//         res.status(200).json(poke);
//       } else {
//         res.status(404).send("POKE API NOT FOUND");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   } else {
//     try {
//       const pokemon = await Pokemon.findOne({
//         where: { name: name },
//         include: {
//           model: Tipo,
//           attributes: ["name"],
//           through: {
//             attributes: [],
//           },
//         },
//       });

//       const pokemonBase = {
//         id: pokemon.dataValues.id,
//         name: pokemon.dataValues.name,
//         hp: pokemon.dataValues.hp,
//         strength: pokemon.dataValues.strength,
//         defense: pokemon.dataValues.defense,
//         speed: pokemon.dataValues.speed,
//         height: pokemon.dataValues.height,
//         weight: pokemon.dataValues.weight,
//         image: "https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif",
//         types: pokemon.dataValues.Tipos.map((el) => el.name),
//       };

//       pokemonBase
//         ? res.status(200).json(pokemonBase)
//         : res.status(404).send("Pokemon Not Found IN DATABASE");
//     } catch (error) {
//       console.log(error);
//     }
//   }
// });

// POST

router.post("/", async (req, res) => {
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
  //console.log('ESTEEEEEEEEE' , req.body)

  if (!name) return res.status(404).send("Name is a mandatory!");

  let pokemonCreated = await Pokemon.create({
    name: name.trim(), // elimina los espacios al inicio y al final de la palabra ''fede villa   "" = "fede villa"
    hp,
    strength,
    defense,
    speed,
    height,
    weight,
    createInDataBase,
    // image:
    //   "https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png",
  });

  // dentro de tipo busco todos los tipos que conicida con lo q estoy pasando por BODY
  let typeDb = await Tipo.findAll({
    where: { name: type },
  });
  // metodo me trae de la tabla Tipo el tipo que le estoy pasando y se lo agrega
  pokemonCreated.addTipo(typeDb);

  res.status(200).send("Pokemon created successfully");
});

module.exports = router;
