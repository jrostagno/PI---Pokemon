import {
  GET_TYPES,
  GET_POKEMONS,
  GET_POKEMONS_INIT,
  GET_NAME_POKE,
  POST_POKEMON,
  GET_DETAILS,
  RESET_DETAIL,
  SET_FILTERS,
} from "../actions";

const initialState = {
  pokemons: [],
  allPokemons: [],
  loading: false,
  pokeTypes: [],
  detail: {},
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

    case GET_TYPES:
      return {
        ...state,
        pokeTypes: action.payload,
      };

    case GET_NAME_POKE:
      return {
        ...state,
        pokemons: action.payload,
        loading: false,
      };

    case POST_POKEMON:
      return {
        ...state,
      };

    case GET_DETAILS:
      return {
        ...state,
        detail: action.payload,
        loading: false,
      };

    case RESET_DETAIL:
      return {
        ...state,
        detail: {},
      };
    case SET_FILTERS:
      const filteredPokemonsByType = state.allPokemons.filter(
        (pokemon) =>
          pokemon.types.includes(action.payload.filterByType) ||
          action.payload.filterByType === "All"
      );
      let filteredByPokedex = filteredPokemonsByType;
      if (action.payload.filterByPokedex !== "All") {
        if (action.payload.filterByPokedex === "Created") {
          filteredByPokedex = filteredByPokedex.filter(
            (pokemon) => pokemon.createInDataBase
          );
        } else {
          filteredByPokedex = filteredByPokedex.filter(
            (pokemon) => !pokemon.createInDataBase
          );
        }
      }
      let sortedList = filteredByPokedex;

      switch (action.payload.sortingBy) {
        case "asc":
          sortedList = sortedList.sort((a, b) => {
            if (a.name.toLowerCase().trim() < b.name.toLowerCase().trim())
              return -1;
            if (a.name.toLowerCase().trim() > b.name.toLowerCase().trim())
              return 1;
            return 0;
          });
          break;

        case "des":
          sortedList = sortedList.sort((a, b) => {
            if (a.name.toLowerCase().trim() < b.name.toLowerCase().trim())
              return 1;
            if (a.name.toLowerCase().trim() > b.name.toLowerCase().trim())
              return -1;
            return 0;
          });
          break;

        case "hight":
          sortedList = sortedList.sort((a, b) => {
            return b.strength - a.strength;
          });
          break;

        case "low":
          sortedList = sortedList.sort((a, b) => {
            return a.strength - b.strength;
          });
          break;
        default:
          break;
      }

      return {
        ...state,
        pokemons: sortedList,
      };
    default:
      return state;
  }
}

export default rootReducer;
