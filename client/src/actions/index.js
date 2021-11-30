import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMONS_INIT = "GET_POKEMONS_INIT";
export const GET_TYPES = "GET_TYPES";
export const GET_NAME_POKE = "GET_NAME_POKE";
export const GET_DETAILS = "GET_DETAILS";

export const FILTER_CREATED = "FILTER_CREATED";
export const FILTER_TYPES = "FILTER_TYPES";
export const FILTER_SORT = "FILTER_SORT";

export const POST_POKEMON = "POST_POKEMON";

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
  };
}

export function getTypes() {
  return async function (dispach) {
    let json = await axios.get("http://localhost:3001/types");

    return dispach({
      type: GET_TYPES,
      payload: json.data,
    });
  };
}

export function filterTypes(payload) {
  return {
    type: FILTER_TYPES,
    payload,
  };
}

export function filterSort(payload) {
  return {
    type: FILTER_SORT,
    payload,
  };
}

export function getNamePoke(name) {
  return async function (dispach) {
    try {
      let json = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
      console.log(json);
      return dispach({
        type: GET_NAME_POKE,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function postPokemon(payload) {
  console.log(payload);

  return async function (dispatch) {
    const response = await axios.post(
      "http://localhost:3001/pokemons",
      payload
    );

    return response;
  };
}

export function getDetail(id) {
  return async function (dispacth) {
    try {
      let json = await axios.get(`http://localhost:3001/pokemons/${id}`);
      return dispacth({
        type: GET_DETAILS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
