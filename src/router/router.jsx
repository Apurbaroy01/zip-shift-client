import {
  createBrowserRouter
} from "react-router-dom";
import RoootLayout from "../Layout/RoootLayout";
import Home from "../Page/Home/Home/Home";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import Login from "../Page/Authcation/Login/Login";
import Register from "../Page/Authcation/Login/Register/Register";
import Covarage from "../Page/Covarage/Covarage";

import AddParcel from "../Page/AddParcel/AddParcel";




const router = createBrowserRouter([
  {
    path: "/",
    Component: RoootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path:"covarage",
        Component: Covarage,
      },
      {
        path:"sendParcel",
        element:<AddParcel></AddParcel>
      },
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path:'/login',
        Component: Login
      },
      {
        path:'/register',
        Component: Register
      },
    ]
  },
]);

export default router
