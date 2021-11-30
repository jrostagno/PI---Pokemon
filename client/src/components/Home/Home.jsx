import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes, setFilters } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import estilo from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);

  const isLoading = useSelector((state) => state.loading);
  const pokeTypes = useSelector((state) => state.pokeTypes);

  const [sortingBy, setSortingBy] = useState("All");
  const [filterByPokedex, setFilterByPokedex] = useState("All");
  const [filterByType, setFilterByType] = useState("All");

  // PAGINADO
  // definimos estados Locales
  const [currentPage, setCurrentPage] = useState(1); // guardamos en un estado local la pagina actual y esta seteada en 1 porque arranca en la primer pagina
  const pokemonsPerPage = 12; // este estado local va a setear cuandos poke se cargan con pagina

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemon = allPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // nos traemos el ilstados de pokemons cuando el componente se monta // enl segundo argumento se pasa de lo que depnde ese useEfffect (si dependo del dispach le paso el dispach, montate y ejecutate siempre y cuando lo tengas )
  useEffect(() => {
    if (!allPokemons.length) {
      dispatch(getPokemons());
    }
    if (!pokeTypes.length) {
      dispatch(getTypes());
    }
  }, [dispatch, allPokemons.length, pokeTypes.length]);

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
      <h1 className={estilo.header}>GO POKEMONS</h1>

      <Link to="/pokemons">Crear Personaje</Link>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Cargar todos personajes nuevamente
      </button>

      <button
        type="button"
        onClick={(e) => {
          handleClickAplicar(e);
        }}
      >
        APLICAR
      </button>
      <button
        type="button"
        onClick={(e) => {
          handleClickReset(e);
        }}
      >
        RESET
      </button>

      <div>
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

        <Paginado
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={allPokemons.length}
          paginado={paginado}
        />

        <SearchBar />
        {isLoading ? (
          <h1>Cargando pokemones...</h1>
        ) : (
          <div className={estilo.pokeList}>
            {currentPokemon.length ? (
              currentPokemon.map((poke, index) => (
                <div className={estilo.card} key={index}>
                  <Card
                    name={poke.name}
                    image={poke.image}
                    type={poke.types}
                    id={poke.id}
                  />
                </div>
              ))
            ) : (
              <h1>No results</h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
