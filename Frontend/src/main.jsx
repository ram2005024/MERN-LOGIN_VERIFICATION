import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AppContextProvider } from "./context/AppContext.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Verification from "./pages/Verification.jsx";
import ResetVerification from "./pages/ResetVerification.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const route = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppContextProvider>
        <App />{" "}
      </AppContextProvider>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/emailVerification",
        element: <Verification />,
      },
      {
        path: "/resetVerification",
        element: <ResetVerification />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={route} />
  </StrictMode>
);
