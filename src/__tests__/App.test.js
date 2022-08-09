import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup } from "@testing-library/react";
import App from "../App.tsx";
import {BrowserRouter as Router} from 'react-router-dom';

afterEach(cleanup)
test("renders content", ()=>{
    const component = render(<Router><App></App></Router>)
});
