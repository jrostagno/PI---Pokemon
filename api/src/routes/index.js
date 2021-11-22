const { Router } = require('express');
const{Pokemon,Tipo}= require('../db.js')
const {allPokemons,getInfo, pokemonDetail } = require('../functions/functions.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');


const router = Router();
pokemonDetail(2);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
  



//     const allFullinfo=  allPokeInfo.map(async (el)=>{

//         let pokeDetails= await axios.get(el.url);
//                 let details = pokeDetails.data;

//                 return {
//                     id:details.id,
//                     name:details.name,
//                     hp:details.stats[0].base_stat,
//                     strength:details.stats[1].base_stat,
//                     defense: details.stats[2].base_stat,
//                     speed: details.stats[5].base_stat,
//                     height: details.height,
//                     weight: details.weight,
//                     image: details.sprites.front_default,
//                     types: details.types.map(el=>el.type.name)

//                 }
                             
//     })


    











module.exports = router;
