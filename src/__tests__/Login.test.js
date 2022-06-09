import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { fireEvent, getByRole, getByTestId } from "@testing-library/dom";
import Login from "../components/Login/Login";
import userEvent from "@testing-library/user-event";

afterEach(cleanup)

describe("Login components", () => {
    test("<Login /> renders input fields", () => {
      render(<Router><Login /></Router>);

      const emailField = screen.getByPlaceholderText("E-mail");
      const passwordField = screen.getByPlaceholderText("Password");

      expect(emailField).toBeInTheDocument();
      expect(passwordField).toBeInTheDocument();
    });

    test("Login button", () => {
        render(<Router><Login /></Router>);

        const loginButton = screen.getByText("Login");

        expect(loginButton).toBeInTheDocument();
    });
});
