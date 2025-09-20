import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

import {
  RouterProvider,
} from "react-router-dom";
import router from './router/router';
import AuthProvider from './Context/AuthContext/AuthProvider';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
