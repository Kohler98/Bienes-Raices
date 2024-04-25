import React, { useContext, useEffect, useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { FormularioPropiedades } from './FormularioPropiedades'
 
import { Header } from '../shared/Header'
import { usePropiedades } from '../../store'
import { useNavigate, useParams } from 'react-router'
import { CRMContext } from '../context'

export const EditarPropiedades = () => {
    const navigate = useNavigate()
    const [auth, setAuth] = useContext(CRMContext);
 
    useEffect(()=>{
      if(!auth.isAuthenticated){
        navigate("/")
      }
    },[auth])



    const [errors,setErrors] = useState([])

  return (
    <>
        <Header titulo={"Editar Propiedades"} data={[errors,setErrors]}>
            <FormularioPropiedades data={[errors,setErrors]} />

        </Header>
    </>
  )
}
