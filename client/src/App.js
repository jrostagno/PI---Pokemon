import "./App.css";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import PokemonCreated from "./components/PokemonCreated/PokemonCreated";
import Detail from "./components/Detail/Detail";

// Switch cuando seteamos las rutas

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/pokemons" component={PokemonCreated} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/home/:id" component={Detail} />
          <Redirect to="/home" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
