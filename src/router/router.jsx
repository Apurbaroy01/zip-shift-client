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
import Profile from "../Page/DashBoard/Profile/Profile";
import BeARider from "../Page/DashBoard/BeARider/BeARider";
import PendingRiders from "../Page/DashBoard/PandingRiders/PandingRiders";
import ActiveRiders from "../Page/DashBoard/ActiveRiders/ActiveRiders";
import MakeAdmin from "../Page/DashBoard/MakeAdmin/MakeAdmin";
import AdminRouts from "../Routes/AdminRouts";
import ForbiddenPage from "../Page/Forbidden/ForbiddenPage";
import AssignRiger from "../Page/DashBoard/AssignRider/AssignRiger";
import RiderRoutes from "../Routes/RiderRoutes";
import PandingDelliveries from "../Page/DashBoard/PandingDelliveries/PandingDelliveries";





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
        path:"forbidden",
        Component: ForbiddenPage,
      },
      {
        path:"beARider",
        element: <PrivetRoutes><BeARider></BeARider></PrivetRoutes>
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
      {
        path:"profile",
        Component: Profile,
        
      },
      {
        path:"panding-deliveries",
        element: <RiderRoutes><PandingDelliveries></PandingDelliveries></RiderRoutes>
        
      },
      {
        path:"assign-rider",
        element: <AdminRouts><AssignRiger></AssignRiger></AdminRouts>
        
      },
      {
        path:"panding-riders",
        Component: PendingRiders,
        element: <AdminRouts><PendingRiders></PendingRiders></AdminRouts>
        
      },
      {
        path:"active-riders",
        Component: ActiveRiders,
        element: <AdminRouts><ActiveRiders></ActiveRiders></AdminRouts>
        
      },
      {
        path:"makeAdmin",
        element: <AdminRouts><MakeAdmin></MakeAdmin></AdminRouts>
        
      },
    ]
  },
]);

export default router;
