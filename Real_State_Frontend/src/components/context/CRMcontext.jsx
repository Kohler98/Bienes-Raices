import React, {  createContext, useState } from 'react';

const CRMContext = createContext([{},()=>{}])
const CRMProvider = ({children}) =>{
 
    // definir el state inicial
    const [auth, setAuth] = useState({
        token: "",
        isAuthenticated: false,
        userRole:""
    });
 
    return(
        <CRMContext.Provider value={[auth, setAuth]}>
            {children}
        </CRMContext.Provider>
    )
}

export{
    CRMContext,
    CRMProvider
}