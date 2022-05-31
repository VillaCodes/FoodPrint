import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { fireEvent, getByRole, getByTestId } from "@testing-library/dom";
import RecipeItem from "../components/Recipes/RecipeItem";
import RecipePage from "../components/Recipes/RecipePage";
import userEvent from "@testing-library/user-event";

afterEach(cleanup)

describe("Recipes components", () => {
    test("<RecipeItem /> renders", () => {
        render(<Router>
            <RecipeItem recipeID={24} text="hello" image="unknown.jpg" />
        </Router>)

        const cardTitle = screen.getByRole("heading");

        expect(cardTitle).toBeInTheDocument();
    });

    test("<RecipePage /> renders", () => {
        render(<Router><RecipePage /></Router>)

        const page = screen.getByTestId("recipePage");

        expect(page).toBeInTheDocument();
    });
});