import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { fireEvent, getByRole, getByTestId } from "@testing-library/dom";
import LandingPagePopup from "../components/LandingPage/LandingPagePopup";
import userEvent from "@testing-library/user-event";

afterEach(cleanup);

describe("<LandingPagePopup />", () => {
    test("component renders", async () => {
        render(<Router>
                <LandingPagePopup />
              </Router>);

        const title = screen.getByText("Welcome to FoodPrint!");

        expect(title).toBeInTheDocument();
    });

    test("suggested ingredient buttons render", async () => {
        render(
          <Router>
            <LandingPagePopup />
          </Router>
        )

        const button = screen.getByRole("button", {name: "eggs"});

        expect(button).toBeInTheDocument();
    });
});
