const { Pokemon, Tipo } = require("../db.js");

const axios = require("axios");

// OBTENGO LOS 40 POKEMOSN DE LAS API

const getAllPokemons = async () => {
  const infoApi = await axios.get("https://pokeapi.co/api/v2/pokemon");

  const infoApiPokemons = infoApi.data.results;

  const infoApi1 = await axios.get(infoApi.data.next);

  const infoApiPokemons1 = infoApi1.data.results;

  const allPokeInfoApi = infoApiPokemons.concat(infoApiPokemons1);

  let subresquest = allPokeInfoApi.map((el) => axios.get(el.url));

  let pokemonesApi = await Promise.all(subresquest);

  pokemonesApi = await pokemonesApi.map((poke) => {
    return {
      id: poke.data.id,
      name: poke.data.name,
      hp: poke.data.stats[0].base_stat,
      strength: poke.data.stats[1].base_stat,
      defense: poke.data.stats[2].base_stat,
      speed: poke.data.stats[5].base_stat,
      height: poke.data.height,
      weight: poke.data.weight,
      image:
        poke.data.sprites.versions["generation-v"]["black-white"].animated
          .front_default,
      types: poke.data.types.map((el) => el.type.name),
    };
  });

  const infoDb = await Pokemon.findAll({
    include: {
      model: Tipo,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  // console.log(infoDb);
  const normalizeDb = infoDb.map((poke) => {
    return {
      id: poke.dataValues.id,
      name: poke.dataValues.name,
      hp: poke.dataValues.hp,
      strength: poke.dataValues.strength,
      defense: poke.dataValues.defense,
      speed: poke.dataValues.speed,
      height: poke.dataValues.height,
      weight: poke.dataValues.weight,
      image: "https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif",
      types: poke.dataValues.Tipos.map((el) => el.name),
      createInDataBase: poke.dataValues.createInDataBase,
    };
  });

  const infoTotal = [...pokemonesApi, ...normalizeDb];
  //console.log(infoTotal);
  return infoTotal;
};

// FUNCION NOS DA EL DETALLE PARA LA RUTA PRINCIPAL SOLO DESDE POKE API -IDE

const InfoDetailPokeApi = async () => {
  const infoPokeApi = await getOnlyPokeApi();

  let detailPoke = [];

  for (let i = 0; i < infoPokeApi.length; i++) {
    const poke = await axios.get(infoPokeApi[i].url);
    const data = poke.data;

    detailPoke.push({
      name: data.name,
      hp: data.stats[0].base_stat,
      strength: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      speed: data.stats[5].base_stat,
      height: data.height,
      weight: data.weight,
      image: data.sprites.front_default,
      types: data.types.map((el) => el.type.name),
    });
  }

  //console.log(detailPoke);
  return detailPoke;
};

// FUNCION NOS DA EL DETALLE DE UN POKEMON DE API EN PARTICULAR  POR ID

const pokemonDetail = async (idPokemon) => {
  try {
    const pokemon = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${idPokemon}`
    );

    if (pokemon) {
      const data = pokemon.data;

      const pokeID = {
        id: data.id,
        name: data.name,
        hp: data.stats[0].base_stat,
        strength: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
        height: data.height,
        weight: data.weight,
        image: data.sprites.front_default,
        types: data.types.map((el) => el.type.name),
      };

      return pokeID;
    } else {
      return {};
    }
  } catch (err) {
    return {};
  }
};

//FUNCION QUE NOS DA EL DETALLE DEL POKEMON POR NOMBRE

const pokeDetailName = async (name) => {
  const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

  if (pokemon) {
    const data = pokemon.data;

    const pokeName = {
      id: data.id,
      name: data.name,
      hp: data.stats[0].base_stat,
      strength: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      speed: data.stats[5].base_stat,
      height: data.height,
      weight: data.weight,
      image:
        data.sprites.versions["generation-v"]["black-white"].animated
          .front_default,
      types: data.types.map((el) => el.type.name),
    };

    console.log(pokeName);
    // return pokeName;
  } else {
    return [];
  }
};

// FUNCION QUE DA EL DETALLE DE POKEMON CREADO
// const pokeCreatedDetail = (idPokemon) => {
//   return Pokemon.findOne({
//     where: {
//       id: idPokemon,
//     },
//     include: {
//       model: Tipo,
//       attributes: ["name"],
//       through: {
//         attributes: [],
//       },
//     },
//   }).then((pokemon) => {
//     if (!pokemon) {
//       return [];
//     }
//     return {
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
//   });
// };

/// buscando BASE DATOS

const pokefind = async (name) => {
  const pokemon = await Pokemon.findOne({
    where: { name: name },
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

  console.log("ESTO ES ...", pokemonId);
};

module.exports = {
  InfoDetailPokeApi,

  pokeDetailName,
  getAllPokemons,
  pokemonDetail,
  pokefind,
};
