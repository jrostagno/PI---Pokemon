const { Router } = require('express');
const{Pokemon,Tipo}= require('../db.js')
const axios = require('axios');
const {allPokemons, pokemonDetail} = require('../functions/functions.js')

const router = Router();

 // OBTENER POKEMON POR ID , 

 router.get("/:idPokemon", async (req, res) => {
   // console.log("ENTROOOOOOO ", req);
   const { idPokemon } = req.params;
  
   if (idPokemon.length < 5) {
     const detail = await pokemonDetail(idPokemon);
     console.log('ENTREO LINEA 17')
     detail ? res.status(200).send(detail) : res.status(404).send("Pokemon Not found");

   }else{

    //  const detailPoke = await pokeCreatedDetail();
   
    //  console.log('detailPoke', detailPoke);
    //  detailPoke ? res.status(200).send(detailPoke)
    //    : res.status(404).send("Pokemon Not found 27");

    const pokemon= await Pokemon.findOne({

      where:{id: idPokemon},
      include:{
        model:Tipo,
        attributes: ['name'],
        through: {
          attributes:[],
        },
      },


    });

      const pokemonId= {
        id: pokemon.dataValues.id,
        name: pokemon.dataValues.name,
        hp: pokemon.dataValues.hp,
        strength: pokemon.dataValues.strength,
        defense: pokemon.dataValues.defense,
        speed: pokemon.dataValues.speed,
        height: pokemon.dataValues.height,
        weight: pokemon.dataValues.weight,
        image: "https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif",
        type: pokemon.dataValues.Tipos.map((el) => el.name)

      }

     pokemonId.id ?  res.status(200).send(pokemonId) : res.status(404).send('Pokemon Not Found');


   }


 });
  





 
   // POKEMONS POR QUERY   / POKEMOSN TODOS 
   router.get("/", async (req, res) => {
     const { name } = req.query;

     const pokemons = await allPokemons();

     const pokeApi = pokemons.filter((poke) => poke.hasOwnProperty("url"));

     if (!name) return res.status(200).send(pokeApi);

     if (name) {
       for (let i = 0; i < pokemons.length; i++) {
         if (pokemons[i].name.toLowerCase() === name.toLowerCase()) {
           return res.status(200).send(pokemons[i]);
         }
       }
       return res.status(404).send("Pokemon Not Found");
     }
   });



   







// POST 

router.post('/', async(req,res)=>{

    const { name, hp, strength, defense, speed, height, weight, type, createInDataBase } = req.body;
     //console.log('ESTEEEEEEEEE' , req.body)
 
     if(!name) return res.status(404).send('Name is a mandatory!')
 
    // let pokemons = await allPokemons();
 
    // let pokeFound= pokemons.find(el => el.name ===name);
 
    // if(pokeFound){
 
    //  return res.status(404).send('Pokemon already exists')
 
    // }
 
     let pokemonCreated = await Pokemon.create({
 
        name,
        hp,
        strength,
        defense,
        speed,
        height,
        weight,
        createInDataBase
 
     })
     
     // dentro de tipo busco todos los tipos que conicida con lo q estoy pasando por BODY
    let typeDb = await Tipo.findAll({
 
     where: {name: type}
 
    })
      // metodo me trae de la tabla Tipo el tipo que le estoy pasando y se lo agrega 
     pokemonCreated.addTipo(typeDb);
 
     res.status(200).send('Pokemon created successfully');
 
 
 
   })
 






   module.exports = router;