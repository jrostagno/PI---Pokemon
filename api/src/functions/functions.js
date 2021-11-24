const{Pokemon,Tipo}= require('../db.js')

const axios = require('axios');


// OBTENGO LOS 40 POKEMOSN DE LAS API 

const getOnlyPokeApi = async()=>{
    
        const infoApi = await axios.get("https://pokeapi.co/api/v2/pokemon");
    
        const infoApiPokemons = infoApi.data.results;
     
        const infoApi1 = await axios.get(infoApi.data.next);
     
        const infoApiPokemons1 = infoApi1.data.results;
     
        const allPokeInfoApi =  infoApiPokemons.concat(infoApiPokemons1);
// console.log(allPokeInfoApi)
        return allPokeInfoApi;

}


//OBTENGO UN ARRAY CON LOS 40 POKEMONES DE LA API  + LOS CREADOS DE LA BASE DE DATOS 
const allPokemons = async()=>{

    const pokeApi= await getOnlyPokeApi();
 
    const infoBD = await Pokemon.findAll({
      includes:{
          model: Tipo,
          attributes:['name'],
          through:{
              attributes:[],
          }
 
      }
    });

  //console.log(infoBD)
 
    const baseDatos = [...infoBD, ...pokeApi];
 //console.log(baseDatos)
  return baseDatos;

}


// FUNCION NOS DA LOS DETALLES DE LOS POKEMONS PARA LA RUTA PRINCIPAL

const getInfo = async () => {
   
    const baseDatos= await allPokemons()

   let infoDetail=[];

  for(let i=0; i<baseDatos.length; i++){

   if(baseDatos[i].url){

        const poke = await axios.get(baseDatos[i].url)
        const datos= poke.data
      
        infoDetail.push({
            name: datos.name,
            img: datos.sprites.front_default,
            types: datos.types.map(el=>el.type.name),
            strength: datos.stats[1].base_stat
        })

    }else{

        infoDetail.push({

          name: baseDatos[i].name,
          img: "https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif",
          types:baseDatos[i].Tipos.map(el=>el.name),
          strength:baseDatos[i].strength
        })
    }
   }
   //console.log(infoDetail)
  return infoDetail;

 };   
 
 

 // FUNCION NOS DA EL DETALLE PARA LA RUTA PRINCIPAL SOLO DESDE POKE API -IDE


 const InfoDetailPokeApi = async () => {
   const infoPokeApi = await getOnlyPokeApi();

   let detailPoke = [];

   for (let i = 0; i < infoPokeApi.length; i++) {
     const poke = await axios.get(infoPokeApi[i].url);
     const datos = poke.data;

     detailPoke.push({
       name: datos.name,
       img: datos.sprites.front_default,
       types: datos.types.map((el) => el.type.name),
       strength: datos.stats[1].base_stat,
     });
   }

   // console.log(detailPoke)
   return detailPoke;
 };


 // FUNCION NOS DA EL DETALLE DE UN POKEMON DE API EN PARTICULAR  POR ID

 const pokemonDetail = async (idPokemon) => {
   const pokemon = await axios.get(
     `https://pokeapi.co/api/v2/pokemon/${idPokemon}`
   );
   // console.log(pokemon);
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
   }else{

    return [];
   }
 };

 // FUNCION QUE DA EL DETALLE DE POKEMON CREADO
  const pokeCreatedDetail = (idPokemon) => {
    return Pokemon.findOne({
      where: {
        id: idPokemon,
      },
      include: {
        model: Tipo,
        attributes:['name'],
        through:{
            attributes:[],
        }
      },
    }).then((pokemon) => {
      if (!pokemon) {
        return [];
      }
      return {
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
      };
    });
  };


 




 module.exports={
    allPokemons,
    getInfo,
    pokemonDetail,
    getOnlyPokeApi,
    InfoDetailPokeApi,
    pokeCreatedDetail,

 };




