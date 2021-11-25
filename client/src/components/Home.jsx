import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);

  // PAGINADO
  // definimos estados Locales
  const [currentPage, setCurrentPage] = useState(1); // guardamos en un estado local la pagina actual y esta seteada en 1 porque arranca en la primer pagina
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12); // este estado local va a setear cuandos poke se cargan con pagina
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemon = allPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  console.log(currentPage);
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // nos traemos el ilstados de pokemons cuando el componente se monta // enl segundo argumento se pasa de lo que depnde ese useEfffect (si dependo del dispach le paso el dispach, montate y ejecutate siempre y cuando lo tengas )
  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }

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
      <div>
        <select>
          <option value="asc">Ascendente</option>
          <option value="des">Descendente</option>
        </select>

        <option value="type">Tipo de pokemon</option>

        <select>
          <option value="all">Todos</option>
          <option value="created">Creados</option>
          <option value="">Existentes</option>
        </select>

        <Paginado
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={allPokemons.length}
          paginado={paginado}
        />

        {currentPokemon &&
          currentPokemon.map((poke) => {
            return (
              <div className="cards">
                <div>
                  <Link to={"/home/" + poke.id}>
                    <Card name={poke.name} image={poke.img} type={poke.types} />
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
