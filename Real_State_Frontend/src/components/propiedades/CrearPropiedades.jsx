import React, { useContext, useEffect, useState } from 'react'
import { Header } from '../shared/Header'
import { useForm } from '../../hooks/useForm'
import { FormularioPropiedades } from './FormularioPropiedades'
import { usePropiedades } from '../../store'
import { CRMContext } from '../context'
import { useNavigate } from 'react-router'
 

export const CrearPropiedades = () => {
    const navigate = useNavigate()
    const [auth, setAuth] = useContext(CRMContext);
  
    useEffect(()=>{
      if(!auth.isAuthenticated){
        navigate("/")
      }
    },[auth])
    const onResetForm = usePropiedades(state => state.onResetForm)
 
    const [errors,setErrors] = useState([])
 
    useEffect(()=>{
        onResetForm()
    },[])
  return (
    <>
        <Header titulo={"Crear Propiedades"} data={[errors,setErrors]}>
            <FormularioPropiedades data={[errors,setErrors]} />
 
        </Header>
    </>
  )
}
