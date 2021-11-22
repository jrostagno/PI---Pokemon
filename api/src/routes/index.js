const { Router } = require('express');
const{Pokemon,Tipo}= require('../db.js')
const {allPokemons,getInfo, pokemonDetail,getOnlyPokeApi } = require('../functions/functions.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//getInfo();
 
// OBTERNER LISTAODO DE POKEMONS 
// router.get("/pokemons", async (req, res) => {
//   // console.log('ENTROO')
//   const pokemons = await getInfo();

//   pokemons.length
//     ? res.status(200).send(pokemons)
//     : res.status(400).send("Pokemon Not Found");
// });


 // OBTENER POKEMON POR ID , 

 router.get("/pokemons/:idPokemon", async (req, res) => {
  // console.log("ENTROOOOOOO ", req);
   const { idPokemon } = req.params;

   const detail = await pokemonDetail(idPokemon);

   detail
     ? res.status(200).send(detail)
     : res.status(400).send("Pokemon Not found");
 });

 
 // POKEMONS POR QUERY 
 router.get('/pokemons', async (req,res)=>{

  //console.log('ENTROOOOOOOOOO')

    const {name}=req.query;
   
    let pokemons = await allPokemons();

      if(name){
        let pokeFound= pokemons.find(el => el.name.toLowerCase()===name.toLowerCase());
        pokeFound ? res.status(200).send(pokeFound) : res.status(400).send('Pokemon Not Found')

      }else{

        const pokemons = await getInfo();
        pokemons.length ? res.status(200).send(pokemons) : res.status(400).send("Pokemon Not Found");
  
      }

 })

  // POST 

  router.post('/pokemons', async(req,res)=>{

   const { id, name, hp, strength, defense, speed, height, weight, type, createInDataBase } = req.body;
    //console.log('ESTEEEEEEEEE' , req.body)
   let pokemons = await allPokemons();

   let pokeFound= pokemons.find(el => el.name ===name);

   if(pokeFound){

    return res.status(400).send('Pokemon already exists')

   }

    let pokemonCreated = await Pokemon.create({

       id,
       name,
       hp,
       strength,
       defense,
       speed,
       height,
       weight,
       createInDataBase

    })
    
    
   let typeDb = await Tipo.findAll({

    where: {name: type}

   })

    pokemonCreated.addtTipo(typeDb);

    res.status(200).send('Pokemon created succefully');



  })


  // GET TYPES

  router.get("/types", async (req, res) => {
    const pokeApi = await getOnlyPokeApi();

    let pokeTypes = [];

    for (let i = 0; i < pokeApi.length; i++) {
      const infoPoke = await axios.get(pokeApi[i].url);
      const data = infoPoke.data;

      data.types.forEach((el) => {
        pokeTypes.push(el.type.name);
      });
    }

    let pokeTypesFilter = pokeTypes.filter(
      (tipo, index, array) => index === array.indexOf(tipo)
    );

    pokeTypesFilter.forEach((el) => {
      Tipo.findOrCreate({
        where: { name: el },
      });
    });

    const allTypes = await Tipo.findAll();

    res.send(allTypes);
  });




module.exports = router;
