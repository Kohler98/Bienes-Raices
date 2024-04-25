import { Navbar } from "./components/shared/Navbar"
import {
  BrowserRouter as Router
} from "react-router-dom";

import { Rutas } from "./Rutas";
import { useContext, useState } from "react";
import { CRMContext, CRMProvider } from "./components/context/CRMcontext";
function App() {

  const [auth, setAuth] = useContext(CRMContext);


  return (
    <>
      <CRMProvider value={[auth, setAuth]}>

        <Router>

          <Navbar />
          <div className="min-h-screen bg-gray-100">
            <Rutas />
          </div>
        </Router>
      </CRMProvider>
    </>
  )
}

export default App
