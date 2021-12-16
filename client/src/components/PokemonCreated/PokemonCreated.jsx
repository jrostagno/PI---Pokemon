import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, postPokemon } from "../../actions";
import estilo from "./PokemonCreated.module.css";
import logopokemon from "../../assets/logoPokemon.png";

function validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "Name is required !";
  }
  if (!input.hp) {
    errors.hp = "Hp is required ! ";
  }
  if (!input.strength) {
    errors.strength = "strength is required !";
  }

  if (!input.type.length) {
    errors.type = "The name, hp , strenght and type are required ! !";
  }

  return errors;
}

export default function PokemonCreated() {
  const dispatch = useDispatch();

  const history = useHistory();

  const pokeTypes = useSelector((state) => state.pokeTypes);

  const [input, setInput] = useState({
    name: "",
    hp: "",
    strength: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    type: [],
  });

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelect(e) {
    setInput({
      ...input,
      type: [...input.type, e.target.value],
    });
  }

  function handleSubmitPost(e) {
    e.preventDefault();
    const errors = validate(input);

    if (!Object.keys(errors).length) {
      dispatch(postPokemon(input));
      alert("Pokemon created Succssesfully !! ");
      setInput({
        name: "",
        hp: "",
        strength: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        type: [],
      });
      history.push("/home");
    } else {
      alert("The name, hp , strenght and type are required ! ");
    }
  }

  function handleDelete(el) {
    setInput({
      ...input,
      type: input.type.filter((type) => type !== el),
    });
  }

  return (
    <div className={estilo.formContainer}>
      <div className={estilo.header}>
        <img src={logopokemon} alt="pokemons" width="130px" />
      </div>
      <h1 className={estilo.titleFrom}>Let's create your Poke !!</h1>

      <form
        onSubmit={(e) => {
          handleSubmitPost(e);
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <div>
              <label className={estilo.formLabels}>Name </label>
              <input
                className={estilo.input}
                type="text"
                value={input.name}
                name="name"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>

            <div>
              <label className={estilo.formLabels}>hp </label>
              <input
                type="number"
                className={estilo.input}
                value={input.hp}
                name="hp"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>

            <div>
              <label className={estilo.formLabels}>strength </label>
              <input
                type="number"
                className={estilo.input}
                value={input.strength}
                name="strength"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>

            <div>
              <label className={estilo.formLabels}>defense </label>
              <input
                type="number"
                className={estilo.input}
                value={input.defense}
                name="defense"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>

            <div>
              <label className={estilo.formLabels}>speed </label>
              <input
                type="number"
                className={estilo.input}
                value={input.speed}
                name="speed"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>

            <div>
              <label className={estilo.formLabels}>height </label>
              <input
                type="number"
                className={estilo.input}
                value={input.height}
                name="height"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div>
              <label className={estilo.formLabels}>weight </label>
              <input
                type="number"
                className={estilo.input}
                value={input.weight}
                name="weight"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
          </div>
          <div>
            <label className={estilo.formLabels}>Choose type! </label>

            <select onChange={(e) => handleSelect(e)} name="type">
              {pokeTypes.map((t, i) => {
                return (
                  <option value={t.name} key={i}>
                    {t.name}
                  </option>
                );
              })}
            </select>
            <br></br>
            <div>
              {input.type.map((el, index) => {
                return (
                  <div key={index}>
                    <button
                      type="button"
                      className={estilo.buttonCheck}
                      onClick={() => handleDelete(el)}
                    >
                      x
                    </button>
                    <span className={estilo.nameType}>{el}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <button type="submit" className={estilo.createButton}>
          Create
        </button>
      </form>

      <Link to="/home">
        <button className={estilo.goBackButton}>Go Back!</button>
      </Link>
    </div>
  );
}
