import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

// importing pages
import Landing from "./assets/pages/landingPage/Landing";
import Login from "./assets/pages/loginPage/Login";
import Register from "./assets/pages/register/Register";
import Admin from "./assets/pages/admin/Admin";
import Profile from "./assets/pages/profile/Profile";
import Request from "./assets/pages/requests/Request";
import CustomerTable from "./assets/components/customerTable/CustomerTable.jsx";
import { UserDetails } from "./assets/pages/userDetails/UserDetails.jsx";
import ChangePassword from "./assets/pages/changePassword/ChangePassword.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/admin",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <Navigate to="/admin/all" />,
          },
          {
            path: ":groupID",
            element: <CustomerTable />,
          },
          {
            path: "user-details/:userID",
            element: <UserDetails />,
          },
        ],
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/requests",
        element: <Request />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
