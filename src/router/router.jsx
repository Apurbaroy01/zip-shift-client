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
import Payment from "../Page/DashBoard/Payment/Payment";
import PaymentHistory from "../Page/DashBoard/Payment/PaymentHistory";
import TrackParcel from "../Page/DashBoard/TrackParcel/TrackParcel";





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
        element: <PrivetRoutes><AddParcel></AddParcel></PrivetRoutes>
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
      {
        path:"payment/:parcelId",
        Component: Payment,
        
      },
      {
        path:"paymentHistory",
        Component: PaymentHistory
        
      },
      {
        path:"tracking",
        Component: TrackParcel,
        
      },
    ]
  },
]);

export default router;
