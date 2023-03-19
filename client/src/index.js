import reportWebVitals from './reportWebVitals';

import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import Portail from "./Portail";
import PortailEne from "./PortailEne";
import Wdc from './Wdc';
import WdcS from './WdcS';
import Alma from './Alma';
import ErrorPage from "./error-page";
import Contact from './routes/contact';
import Connexion from './Connexion';
import Root from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/wdc",
    element: <Wdc />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/wdcsemaines",
    element: <WdcS />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/root",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/Connexion",
    element: <Connexion />,
  },
  {
    path: "/portail-enedis",
    element: <PortailEne />,
  },
  {
    path: "/cbbc-enedis",
    element: <Portail />,
  },
  {
    path: "/Alma",
    element: <Alma />,
    errorElement: <ErrorPage />,
  },
]);



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
