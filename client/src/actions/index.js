import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMONS_INIT = "GET_POKEMONS_INIT";
export const GET_TYPES = "GET_TYPES";

export const FILTER_CREATED = "FILTER_CREATED";
export const FILTER_TYPES = "FILTER_TYPES";

export function getPokemons() {
  return async function (dispatch) {
    dispatch({
      type: GET_POKEMONS_INIT,
    });
    let json = await axios.get("http://localhost:3001/pokemons");

    return dispatch({
      type: GET_POKEMONS,
      payload: json.data,
    });
  };
}

export function getCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
    type: payload1,
  };
}

export function getTypes() {
  return async function (dispach) {
    let json = await axios.get("https://pokeapi.co/api/v2/type");

    return dispach({
      type: GET_TYPES,
      payload: json.data.results,
    });
  };
}

export function filterTypes(payload) {
  return {
    type: FILTER_TYPES,
    payload,
  };
}
