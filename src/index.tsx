import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import LagrangePolynomial from './labs/LagrangePolynomial';
import IntegrationRunge from 'labs/IntegrationRunge';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "lagrange-polynom",
    element: <LagrangePolynomial />,
  },
  {
    path: "integration-runge",
    element: <IntegrationRunge />,
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
