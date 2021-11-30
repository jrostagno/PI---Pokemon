import {
  FILTER_CREATED,
  FILTER_TYPES,
  GET_TYPES,
  GET_POKEMONS,
  GET_POKEMONS_INIT,
  FILTER_SORT,
  GET_NAME_POKE,
  POST_POKEMON,
  GET_DETAILS,
} from "../actions";

const initialState = {
  pokemons: [],
  allPokemons: [],
  loading: false,
  pokeTypes: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
        loading: false,
      };
    case GET_POKEMONS_INIT:
      return {
        ...state,
        loading: true,
      };

    case FILTER_CREATED:
      let filterPoke = [];
      if (action.payload === "All") {
        filterPoke = state.allPokemons;
      }
      if (action.payload === "Created") {
        filterPoke = state.allPokemons.filter((el) => el.createInDataBase);
      }
      if (action.payload === "Pokedex") {
        filterPoke = state.allPokemons.filter((el) => !el.createInDataBase);
      }

      return {
        ...state,
        pokemons: filterPoke,
      };

    case GET_TYPES:
      return {
        ...state,
        pokeTypes: action.payload,
      };

    case FILTER_TYPES:
      const pokeType = state.allPokemons.filter((poke) =>
        poke.types.includes(action.payload.toLowerCase())
      );

      return {
        ...state,
        pokemons: pokeType,
      };

    case FILTER_SORT:
      let sortFilter = [];

      if (action.payload === "hight") {
        sortFilter = state.allPokemons.sort((a, b) => {
          return b.strength - a.strength;
        });
      }
      if (action.payload === "low") {
        sortFilter = state.allPokemons.sort((a, b) => {
          return a.strength - b.strength;
        });
      }
      if (action.payload === "asc") {
        sortFilter = state.allPokemons.sort((a, b) => {
          if (a.name.toLowerCase().trim() < b.name.toLowerCase().trim())
            return -1;
          if (a.name.toLowerCase().trim() > b.name.toLowerCase().trim())
            return 1;
          return 0;
        });
      }

      if (action.payload === "des") {
        sortFilter = state.allPokemons.sort((a, b) => {
          if (a.name.toLowerCase().trim() < b.name.toLowerCase().trim())
            return 1;
          if (a.name.toLowerCase().trim() > b.name.toLowerCase().trim())
            return -1;
          return 0;
        });
      }

      return {
        ...state,
        pokemons: sortFilter,
      };

    case GET_NAME_POKE:
      return {
        ...state,
        pokemons: action.payload,
      };

    case POST_POKEMON:
      return {
        ...state,
      };

    case GET_DETAILS:
      return {
        ...state,
        detail: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
