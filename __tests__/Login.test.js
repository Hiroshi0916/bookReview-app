// import React, { createContext } from 'react'; 
// import { BrowserRouter as Router } from 'react-router-dom';
// import Login from '../src/Login'; 
// import { render, screen } from '@testing-library/react';
// import { AuthContext } from "../src/AuthContext";
// import '@testing-library/jest-dom/extend-expect';

// const mockContext = {
//   isAuthenticated: false,
//   setIsAuthenticated: jest.fn(),
//   user: null,
//   setUser: jest.fn(),
// };

//   test("renders Login component", () => {
//     render(
//         <AuthContext.Provider value={mockContext}>
//     <Router>
//     <Login />
//     </Router>
//         </AuthContext.Provider>
//     );
//     const buttonElement = screen.getByText('Log In');
//     expect(buttonElement).toBeInTheDocument(); 
//   });

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../src/Login';
import { render, screen } from '@testing-library/react';
import { AuthContext } from "../src/AuthContext";
import '@testing-library/jest-dom/extend-expect';

const mockContext = {
  isAuthenticated: false,
  setIsAuthenticated: jest.fn(),
  user: null,
  setUser: jest.fn(),
};

test("renders Login component", () => {
  render(
    <AuthContext.Provider value={mockContext}>
      <Router>
        <Login />
      </Router>
    </AuthContext.Provider>
  );

  const emailInput = screen.getByPlaceholderText('Email');
  expect(emailInput).toBeInTheDocument();
  expect(emailInput).toHaveAttribute('type', 'email');

  const passwordInput = screen.getByPlaceholderText('Password');
  expect(passwordInput).toBeInTheDocument();
  expect(passwordInput).toHaveAttribute('type', 'password');

  const buttonElement = screen.getByText('Log In');
  expect(buttonElement).toBeInTheDocument();
});
