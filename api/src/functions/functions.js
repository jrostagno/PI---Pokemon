const{Pokemon,Tipo}= require('../db.js')

const axios = require('axios');


// OBTENGO LOS 40 POKEMOSN DE LAS API 

const getOnlyPokeApi = async()=>{
    
        const infoApi = await axios.get("https://pokeapi.co/api/v2/pokemon");
    
        const infoApiPokemons = infoApi.data.results;
     
        const infoApi1 = await axios.get(infoApi.data.next);
     
        const infoApiPokemons1 = infoApi1.data.results;
     
        const allPokeInfoApi =  infoApiPokemons.concat(infoApiPokemons1);

        return allPokeInfoApi;

}


//OBTENGO UN ARRAY CON LOS 40 POKEMONES DE LA API DONDE TENGO SU NOMBRE Y LA URL CON SUS PROPIEDADES. //  LOS DE LA BASE DE DATOS 
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
 
    const baseDatos = [...infoBD, ...pokeApi];
 console.log(baseDatos)
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
          //types:baseDatos[i].Tipo.map(el=>)
          strength:baseDatos[i].strength
        })
    }
   }
 //  console.log(infoDetail)
  return infoDetail;

 };      


 // FUNCION NOS DA EL DETALLE DE UN POKEMON EN PARTICULAR  POR ID

 const pokemonDetail = async (idPokemon) => {
  
   try{
        const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)

        if(pokemon){
            
            const  data= pokemon.data;
        
            const pokeID= {
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
        
            return pokeID
            
        }else{

            const pokemonBaseDato= await Pokemon.findByPk(idPokemon,{include: Tipo});

            if(pokemonBaseDato){

                const pokeDataBase= {
            
                    id: pokeDataBase.id,
                    name: pokeDataBase.name,
                    hp: pokeDataBase.hp,
                    strength:pokeDataBase.strength,
                    defense: pokeDataBase.defense,
                    speed: pokeDataBase.speed,
                    height: pokeDataBase.height,
                    weight: pokeDataBase.weight,
                    image: "https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif",
                    type: pokeDataBase.Tipo.map(el=>el.name)
                   
                }
        
                return pokeDataBase;

            }

        }
        // console.log(pokeID)
    
    } catch (err){

      

    }
        
    }












 module.exports={
    allPokemons,
    getInfo,
    pokemonDetail,
    getOnlyPokeApi,

 };




