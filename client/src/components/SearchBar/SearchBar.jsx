import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePoke } from "../../actions";
import estilo from "../Home/Home.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  function handleInputChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNamePoke(name));
    setName("");
  }

  return (
    <div>
      <input
        value={name}
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          handleInputChange(e);
        }}
      />
      <button
        className={estilo.buttonHome}
        type="submit"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Search
      </button>
    </div>
  );
}
