import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes, setFilters } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import estilo from "./Home.module.css";
import noresult from "../../assets/./notFound.gif";
import loading from "../../assets/./loading.gif";
import logopokemon from "../../assets/./logoPokemon.png";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);

  const isLoading = useSelector((state) => state.loading);
  const pokeTypes = useSelector((state) => state.pokeTypes);

  const [sortingBy, setSortingBy] = useState("All");
  const [filterByPokedex, setFilterByPokedex] = useState("All");
  const [filterByType, setFilterByType] = useState("All");

  // PAGINADO

  const [currentPage, setCurrentPage] = useState(1); // guardamos en un estado local la pagina actual y esta seteada en 1 porque arranca en la primer pagina
  const pokemonsPerPage = 12;
  const indexOfLastPokemon = currentPage * pokemonsPerPage; /// allpkemons.slice(0,12) // allpkemons.slice(12,24)
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemon = allPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (!allPokemons.length) {
      dispatch(getPokemons());
    }
    if (!pokeTypes.length) {
      dispatch(getTypes());
    }
    ////  --->esto permite eliminar los warning de dependencias !
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, pokeTypes.length]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
    setCurrentPage(1);
  }

  function handleOnChangeCreated(e) {
    setFilterByPokedex(e.target.value);
  }

  function handleOnChangeFiltertype(e) {
    setFilterByType(e.target.value);
  }

  function handleSort(e) {
    setSortingBy(e.target.value);
  }

  function handleClickReset() {
    dispatch(
      setFilters({
        sortingBy: "All",
        filterByPokedex: "All",
        filterByType: "All",
      })
    );
    setSortingBy("All");
    setFilterByPokedex("All");
    setFilterByType("All");
    setCurrentPage(1);
  }

  function handleClickAplicar() {
    dispatch(setFilters({ sortingBy, filterByPokedex, filterByType }));
    setCurrentPage(1);
  }

  return (
    <div className={estilo.principal}>
      <div className={estilo.header}>
        <img src={logopokemon} alt="pokemons" width="130px" />
      </div>
      <div className={estilo.barra}>
        <SearchBar />
        <button
          className={estilo.buttonHome}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Reload..
        </button>

        <Link to="/pokemons">
          <button className={estilo.created}>Create your Poke...</button>
        </Link>
      </div>
      <br></br>
      <div>
        <div className={estilo.filtros}>
          <select
            onChange={(e) => {
              handleSort(e);
            }}
            value={sortingBy}
          >
            <option value="All">Select by...</option>
            <option value="asc">Ascending A-Z</option>
            <option value="des">Descending Z-A</option>
            <option value="hight">Hight Strength</option>
            <option value="low">Low Strength</option>
          </select>

          <select
            onChange={(e) => {
              handleOnChangeCreated(e);
            }}
            value={filterByPokedex}
          >
            <option value="All">All</option>
            <option value="Created">Created</option>
            <option value="Pokedex">Pokedex</option>
          </select>

          <select
            onChange={(e) => {
              handleOnChangeFiltertype(e);
            }}
            value={filterByType}
          >
            <option value="All">Types..</option>
            {pokeTypes
              .sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
              })
              .map((t) => (
                <option value={t.name} key={t.name}>
                  {t.name}
                </option>
              ))}
          </select>
          <button
            className={estilo.buttonHome}
            type="button"
            onClick={(e) => {
              handleClickAplicar(e);
            }}
          >
            Apply
          </button>
          <button
            className={estilo.buttonHome}
            type="button"
            onClick={(e) => {
              handleClickReset(e);
            }}
          >
            Reset
          </button>
        </div>

        {isLoading ? (
          <div className={estilo.loading}>
            <img src={loading} alt="loagin" width="200px" />
            <h1>Loading Pokemons...</h1>
          </div>
        ) : (
          <div>
            {currentPokemon.length ? (
              <div>
                <div className={estilo.pokeList}>
                  {currentPokemon.map((poke, index) => (
                    <div className={estilo.card} key={index}>
                      <Card
                        name={poke.name}
                        image={poke.image}
                        type={poke.types}
                        id={poke.id}
                      />
                    </div>
                  ))}
                </div>
                <Paginado
                  pokemonsPerPage={pokemonsPerPage}
                  allPokemons={allPokemons.length}
                  paginado={paginado}
                />
              </div>
            ) : (
              <div className={estilo.noResult}>
                <img
                  className={estilo.imgNotFound}
                  src={noresult}
                  alt="not found"
                  width="200px"
                />
                <h1 className={estilo.notfound}>Sorry Poke Not found...</h1>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
