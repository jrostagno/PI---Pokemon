import React from "react";
import estilo from "./Paginado.module.css";

export default function Paginado({ pokemonsPerPage, allPokemons, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={estilo.botoneraContent}>
        {pageNumbers &&
          pageNumbers.map((number) => {
            return (
              <button
                className={estilo.botonera}
                key={number}
                onClick={() => paginado(number)}
              >
                {number}
              </button>
            );
          })}
      </ul>
    </nav>
  );
}
