import { render, screen } from "@testing-library/react";
import App from "./App";
import LandingPage from "../src/components/LandingPage/LandingPage";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Link from "react-router-dom";
import fondo from "./assets/./pokemonFondo1.jpg";

configure({ adapter: new Adapter() });

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);

//   expect(linkElement).toBeInTheDocument();
// });

// describe("start button", () => {
//   it("renders start Button from landing", () => {
//     render(<LandingPage />);
//     const textTitle = screen.getByRole("button", { name: /Start/i });
//     expect(textTitle).toBeInTheDocument();
//   });
// });

// test("renders start Button from landing", () => {
//   render(<LandingPage />);
//   const textTitle = screen.getByRole("button", { name: /Start/i });
//   expect(textTitle).toBeInTheDocument();
// });

// test("renders start Button from landing", () => {
//   render(<LandingPage />);
//   const textTitle = screen.getByText("Welcome to Pokemon Henry's App...");
//   expect(textTitle).toBeInTheDocument();
// });

describe("<LangindPage />", () => {
  let land;

  beforeEach(() => {
    land = shallow(<LandingPage />);
  });

  it('Debería rederizar un "h1" con el texto "Welcome---"', () => {
    expect(land.find("h1").at(0).text()).toEqual(
      "Welcome to Henry's Pokemon App..."
    );
  });

  it('Debería renderizar un "button"', () => {
    expect(land.find("button").text()).toEqual("Start");
  });

  // it("Deberia tener una imagen Img de fondo", () => {
  //   expect(land.find("img").prop("src")).toBe(fondo);
  // });
});
