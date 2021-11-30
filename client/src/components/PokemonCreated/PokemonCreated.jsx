import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, postPokemon } from "../../actions";

function validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "Name is required !! ";
  }

  return errors;
}

export default function PokemonCreated() {
  const dispatch = useDispatch();

  const history = useHistory();

  const pokeTypes = useSelector((state) => state.pokeTypes);

  const [errors, setErrors] = useState({});

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

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );

    console.log(input);
  }

  function handleSelect(e) {
    setInput({
      ...input,
      type: [...input.type, e.target.value],
    });
  }

  function handleSubmitPost(e) {
    e.preventDefault();
    console.log(input);
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
  }

  function handleDelete(el) {
    setInput({
      ...input,
      type: input.type.filter((type) => type !== el),
    });
  }

  return (
    <div>
      <Link to="/home">
        <button>Go Back!</button>
      </Link>
      <h1>Create your Pokemon</h1>
      <form
        onSubmit={(e) => {
          handleSubmitPost(e);
        }}
      >
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label>hp</label>
          <input
            type="number"
            value={input.hp}
            name="hp"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div>
          <label>strength</label>
          <input
            type="number"
            value={input.strength}
            name="strength"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div>
          <label>defense</label>
          <input
            type="number"
            value={input.defense}
            name="defense"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div>
          <label>speed</label>
          <input
            type="number"
            value={input.speed}
            name="speed"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div>
          <label>height</label>
          <input
            type="number"
            value={input.height}
            name="height"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div>
          <label>weight</label>
          <input
            type="number"
            value={input.weight}
            name="weight"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <span>Choose type!</span>
        <select onChange={(e) => handleSelect(e)}>
          {pokeTypes.map((t, i) => {
            return (
              <option value={t.name} key={i}>
                {t.name}
              </option>
            );
          })}
        </select>

        <button type="submit">Create Pokemon</button>
      </form>
      {input.type.map((el, index) => {
        return (
          <div key={index}>
            <p>{el}</p>
            <button onClick={() => handleDelete(el)}>x</button>
          </div>
        );
      })}
    </div>
  );
}
