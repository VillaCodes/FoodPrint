import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Ingredients from "../components/IngredientList/Ingredients";
import { fireEvent, getByRole, getByTestId } from "@testing-library/dom";
import IngredientsContainer from "../components/IngredientList/IngredientsContainer";
import userEvent from "@testing-library/user-event";

afterEach(cleanup);

describe("<IngredientsContainer /> component", () => {
  it("should render input element", async () => {
    render (
      <Router>
        <IngredientsContainer />
      </Router>
    );

    const inputField = screen.getByPlaceholderText("Add an ingredient");

    expect(inputField.toBeInTheDocument);
  });

  it("input field should determine userIngredient value", async () => {
    render (
      <Router>
        <IngredientsContainer />
      </Router>
    );

    const inputField = screen.getByPlaceholderText("Add an ingredient");

    userEvent.type(inputField, "eggs");

    expect(screen.getByPlaceholderText("Add an ingredient")).toHaveValue("eggs");
  });

  it("calls handler on submit", async () => {
    render(
      <Router>
        <IngredientsContainer />
      </Router>
    );

    const input = screen.getByPlaceholderText("Add an ingredient");
    const form = screen.getByTestId("form")
    fireEvent.change(input, { target: { value: "bananas" } });
    fireEvent.submit(form);

    expect(input).toHaveValue("");
  });
}); 