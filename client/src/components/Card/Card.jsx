import React from "react";
import { Link } from "react-router-dom";
import estilo from "./Card.module.css";

export default function Card({ name, image, type, id }) {
  return (
    <Link to={"/home/" + id}>
      <h3>{name}</h3>
      <div claseName={estilo.contenTag}>
        {type.map((t, i) => {
          return (
            <span key={i} className={estilo.tag}>
              {t}
            </span>
          );
        })}
      </div>
      <img src={image} alt="img not found" width="200px" height="250px" />
    </Link>
  );
}
