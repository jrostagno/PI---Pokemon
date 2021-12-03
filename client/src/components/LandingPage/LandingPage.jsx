import React from "react";
import { Link } from "react-router-dom";
import estilo from "./LandingPage.module.css";
import fondo from "../../assets/./pokemonFondo1.jpg";

export default function LandingPage() {
  return (
    <div className={estilo.landing}>
      <Link to="/home">
        <img url={fondo} alt="" />
        <button>Start</button>
      </Link>
    </div>
  );
}
