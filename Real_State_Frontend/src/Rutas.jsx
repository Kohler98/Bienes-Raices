import React from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { AnimatePresence, motion } from "framer-motion";
import { SignUp } from './components/auth/SignUp';
import { Login } from './components/auth/Login';
import { ForgotPassword } from './components/auth/ForgotPassword';
import { ResetPassword } from './components/auth/ResetPassword';
import { CrearPropiedades } from './components/propiedades/CrearPropiedades';
import { EditarPropiedades } from './components/propiedades/EditarPropiedades';
 
import { Home } from './components/home/Home';
import { PropiedadCard } from './components/home/PropiedadCard';
import { PanelAdministracion } from './components/user/PanelAdministracion';
import { AgregarImagen } from './components/propiedades/AgregarImagen';
import { ConfirmAccount } from './components/auth/ConfirmAccount';
import { Profile, ProfileMessage } from './components/user';

 

export const Rutas = () => {
  const location = useLocation();
      // Animation variants
      const pageTransition = {
        in: {
          opacity: 1,
        },
        out: {
          opacity: 0,
        },
      };
  return (
  <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="out"
            animate="in"
            exit="out"
            variants={pageTransition}
            transition={{ duration: 0.2 }}
          >
            <Routes location={location}>
  
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<Login />} />
              <Route path="/forgot_password" element={<ForgotPassword />} />
              <Route path="/reset_password/:token" element={<ResetPassword />} />
              <Route path="/profile" element={<Profile />} />
 
              
              <Route path="/message" element={<ProfileMessage />} />
              <Route path="/crear" element={<CrearPropiedades />} />
              <Route path="/editar" element={<EditarPropiedades />} />
              <Route path="/propiedad/:id" element={<PropiedadCard />} />
              <Route path="/administracion" element={<PanelAdministracion />} />
              <Route path="/images" element={<AgregarImagen />} />
              <Route path="/confirmar_cuenta/:token" element={<ConfirmAccount />} />
 

            </Routes>
          </motion.div>
        </AnimatePresence>
  )
}
