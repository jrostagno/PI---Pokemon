import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterSort,
  filterTypes,
  getCreated,
  getPokemons,
  getTypes,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const initialAllpokemons = useSelector((state) => state.allPokemons);
  const isLoading = useSelector((state) => state.loading);
  const pokeTypes = useSelector((state) => state.pokeTypes);

  // PAGINADO
  // definimos estados Locales
  const [currentPage, setCurrentPage] = useState(1); // guardamos en un estado local la pagina actual y esta seteada en 1 porque arranca en la primer pagina
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12); // este estado local va a setear cuandos poke se cargan con pagina
  const [render, setRender] = useState("");
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
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }

  function handleOnChangeCreated(e) {
    e.preventDefault();
    dispatch(getCreated(e.target.value));
  }

  function handleOnChangeFiltertype(e) {
    e.preventDefault();
    dispatch(filterTypes(e.target.value));
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(filterSort(e.target.value));
    setCurrentPage(1); // Seteo la pagina en (1)
    setRender(`ordenado${e.target.value}`); // me sirve para cuadndo yo seteo el estado Local me modifique la pagina y se renderize
  }

  //  {valu , vl}

  return (
    <div>
      <Link to="/pokemons">Crear Personaje</Link>
      <h1>GO POKEMONS</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Cargar todos personajes nuevamente
      </button>

      <button
        type="button"
        onClick={() => {
          console.log("pito");
        }}
      >
        APLICAR
      </button>
      <div>
        <select
          onChange={(e) => {
            handleSort(e);
          }}
        >
          <option value="All">Select by...</option>
          <option value="asc">Ascending A-Z</option>
          <option value="des">Descending Z-A</option>
          <option value="hight">Hight Strength</option>
          <option value="low">Low Strength</option>
        </select>

        <span>Tipo de pokemon</span>

        <select
          onChange={(e) => {
            handleOnChangeCreated(e);
          }}
        >
          <option value="All">All</option>
          <option value="Created">Created</option>
          <option value="Pokedex">Pokedex</option>
        </select>

        <select
          onChange={(e) => {
            handleOnChangeFiltertype(e);
          }}
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
          currentPokemon &&
          currentPokemon.map((poke, index) => {
            return (
              <div className="cards" key={index}>
                <div>
                  <Link to={"/home/" + poke.id}>
                    <Card
                      name={poke.name}
                      image={poke.image}
                      type={poke.types}
                    />
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
