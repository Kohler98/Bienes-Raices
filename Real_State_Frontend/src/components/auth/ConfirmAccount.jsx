 import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Header } from '../shared'
import { crudAxios } from '../../config/axios'
 
 export const ConfirmAccount = () => {
  const [errors,setErrors] = useState(['1234'])
  const params = useParams()
  const {token} = params
  
  useEffect(()=>{
    const onHandleValidateAccount = async() =>{
      try {
        const res = await crudAxios.get(`/auth/confirmar_cuenta/${token}`)
 
        setErrors([])
      } catch (error) {
        console.log(error.response.data)
 
      }
    }
    onHandleValidateAccount()
  },[])
   return (
    <>
        <Header titulo={errors.length > 0 ? 'Ops... This page is broken' :"Cuenta confirmada"} >
          {
            errors.length == 0 ? 
            (
              <Link to={'/signin'} className="text-center font-bold text-sm text-slate-600 uppercase mt-10 block">
                Ya puedes iniciar Session
              </Link>
            )
            :
            (
              <Link to={'/'} className="text-center font-bold text-sm text-slate-600 uppercase mt-10 block">
                Go Home
              </Link>
            )
          }
        </Header>
    </>
     
   )
 }
 