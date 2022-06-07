import React from 'react';
import {render, screen, cleanup} from '@testing-library/react';
import MainHeader from '../components/Header/MainHeader';
import {BrowserRouter as Router} from 'react-router-dom';

afterEach(cleanup);

describe('<MainHeader />', () => {
    test("renders title of application", () => {
        render(
        <Router>
            <MainHeader />
        </Router>);

        const title = screen.getByText(/Foodprint/i)
        expect(title.toBeInTheDocument)
    });
}); 