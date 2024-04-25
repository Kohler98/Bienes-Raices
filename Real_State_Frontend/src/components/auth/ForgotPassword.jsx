import React, { useEffect, useState } from 'react'
import { Formulario } from '../shared/Formulario'
import { useForm } from '../../hooks/useForm'
import { Header } from '../shared/Header'
import { crudAxios } from '../../config/axios'
 

export const ForgotPassword = () => {
  const {formState, onInputChange} = useForm({email:''})
  const [errors,setErrors] = useState([])
  const [success,setSuccess] = useState([])

  const handleForgotPassword = async(e) =>{
      e.preventDefault()
      try {
        const res = await crudAxios.post('/auth/forgot_password',formState)
 
        setSuccess([...success,res.data.response])
      } catch (error) {
        console.log(error.response)
      }
  }
  return (
    <Header titulo={"Recuper Contraseña"} data={[errors,setErrors]} success={[success,setSuccess]}>
      <Formulario  onSubmitData={handleForgotPassword}>
          <div  >
              <label htmlFor="email" className=' block text-sm uppercase text-gray-500 mb-3 font-bold'>Email</label>
              <input type="email" name='email' value={formState.email} onChange={onInputChange} id="email" className=' w-full px-3 py-4 border border-gray-300 rounded-md placeholder-gray-400' placeholder='Tu Email'/>
          </div>
          <input type="submit" value={"Enviar Correo"} className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 cursor-pointer' />
      </Formulario>
    </Header>

  )
}
