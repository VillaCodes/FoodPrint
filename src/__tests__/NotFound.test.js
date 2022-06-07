import React from "react";
import {cleanup, render, screen} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NotFound from "../Layout/NotFound";

afterEach(cleanup)

describe("Not Found route component", () => {
    test("renders with message", () => {
        render(
            <Router>
                <NotFound />
            </Router>
        );

        const message = screen.getByText(/Not Found/i);
        expect(message.toBeInTheDocument)
    });
}); 