import {
  createBrowserRouter
} from "react-router-dom";
import RoootLayout from "../Layout/RoootLayout";
import Home from "../Page/Home/Home/Home";



const router = createBrowserRouter([
  {
    path: "/",
    Component: RoootLayout,
    children:[
        {
            index: true,
            Component: Home,
        }
    ]
  },
]);

export default router
