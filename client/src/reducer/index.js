import {
  FILTER_CREATED,
  FILTER_TYPES,
  GET_TYPES,
  GET_POKEMONS,
  GET_POKEMONS_INIT,
} from "../actions";

const initialState = {
  pokemons: [],
  allPokemons: [],
  loading: false,
  pokeTypes: [],
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

    default:
      return state;
  }
}

export default rootReducer;
