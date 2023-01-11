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
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Contact from './routes/contact';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/root",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/cbbc-enedis",
    element: <Portail />,
  },
  {
    path: "/contact",
    element: <Contact />,
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

/* <BrowserRouter>
<App />
</BrowserRouter>, */

/* <React.StrictMode>
<App />
</React.StrictMode>, */