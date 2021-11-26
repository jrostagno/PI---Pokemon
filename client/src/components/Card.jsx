import React from "react";

export default function Card({ name, image, type }) {
  return (
    <div>
      <h3>{name}</h3>
      <div>
        {type.map((t, i) => {
          return (
            <span
              key={i}
              style={{
                marginRight: 8,
                fontSize: 12,
                color: "red",
                border: "1px solid green",
                borderRadius: 4,
                padding: 4,
              }}
            >
              {t}
            </span>
          );
        })}
      </div>
      <img src={image} alt="img not found" width="200px" height="250px" />
    </div>
  );
}
