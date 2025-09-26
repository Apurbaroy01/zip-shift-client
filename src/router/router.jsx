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
import DashboardLayout from "../Layout/DashboardLayout";
import PrivetRoutes from "../Routes/PrivetRoutes";
import MyParcel from "../Page/DashBoard/MyParcel/MyParcel";





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
        element:<AddParcel></AddParcel>,
      },
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path:'/login',
        Component: Login,
      },
      {
        path:'/register',
        Component: Register,
      },
    ]
  },

  {
    path:"/dashboard",
    element:<PrivetRoutes><DashboardLayout></DashboardLayout></PrivetRoutes>,
    children:[
      {
        path:"myParcel",
        Component: MyParcel,
        
      },
    ]
  },
]);

export default router;
