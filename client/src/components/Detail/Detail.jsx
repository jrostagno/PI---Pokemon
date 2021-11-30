import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../../actions/index.js";

export default function Details(props) {
  console.log(props);
  const dispatch = useDispatch();

  const myPoke = useSelector((state) => state.detail);

  console.log(myPoke);

  useEffect(() => {
    console.log(props.match.params.id);
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);

  console.log(myPoke);

  return (
    <div>
      {myPoke ? (
        <div>
          <h1> Name : {myPoke.name}</h1>
          <img src={myPoke.image} alt="" width="500px" height="700px" />
          <h2>Types {myPoke.types}</h2>
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
