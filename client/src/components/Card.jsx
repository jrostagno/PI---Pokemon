import React from "react";

export default function Card({ name, image, type }) {
  return (
    <div>
      <h3>{name}</h3>
      <h3>{type}</h3>
      <img src={image} alt="img not found" width="200px" height="250px" />
    </div>
  );
}
