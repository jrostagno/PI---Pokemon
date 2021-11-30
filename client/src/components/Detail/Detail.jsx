import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail, resetDetail } from "../../actions/index.js";
import estilo from "./Detail.module.css";

export default function Details(props) {
  const dispatch = useDispatch();

  const myPoke = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
    return () => dispatch(resetDetail());
  }, [dispatch, props.match.params.id]);

  return (
    <div className={estilo.contenedorDetail}>
      {myPoke.id ? (
        <div>
          <h1> Name : {myPoke.name}</h1>
          <h2> Id: {myPoke.id}</h2>
          <img src={myPoke.image} alt="" width="300px" height="400px" />
          <div>
            {myPoke.types.map((t, i) => {
              return <h3 key={i}>{t}</h3>;
            })}
          </div>
          <div>
            <span>hp: {myPoke.hp}</span>
          </div>
          <progress max="200" value={myPoke.hp}>
            {myPoke.hp}
          </progress>
          <div>
            <span>Strength: {myPoke.strength}</span>
          </div>
          <progress max="200" value={myPoke.strength}>
            {myPoke.strength}
          </progress>
          <div>
            <span>Defense: {myPoke.defense}</span>
          </div>
          <progress max="200" value={myPoke.defense}>
            {myPoke.defense}
          </progress>
          <div>
            <span>Sepeed: {myPoke.speed}</span>
          </div>
          <progress max="200" value={myPoke.speed}>
            {myPoke.speed}
          </progress>
          <div>
            <span>Height: {myPoke.height}</span>
          </div>
          <progress max="150" value={myPoke.height}>
            {myPoke.height}
          </progress>

          <div>
            <span>Weight: {myPoke.weight}</span>
          </div>
          <progress max="1020" value={myPoke.weight}>
            {myPoke.weight}
          </progress>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <Link to="/home">
        <button>Go Back !! </button>
      </Link>
    </div>
  );
}