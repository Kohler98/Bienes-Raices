import React, { useState } from 'react'
import { Formulario } from '../shared/Formulario'
import { Header } from '../shared/Header'
import { useForm } from '../../hooks/useForm'
import { crudAxios } from '../../config/axios'
import { useParams } from 'react-router'

export const ResetPassword = () => {
  const [errors,setErrors] = useState([])
  const [success,setSuccess] = useState([])
  const {formState, onInputChange} = useForm({password:'',repeat_password:''})
  const params = useParams()
  const {token} = params
  const handleResetPassword = async (e) =>{
    e.preventDefault()
    try {
      const res = await crudAxios.post(`/auth/recover_password/${token}`, formState)
      console.log(res.data)
      setSuccess([...success,res.data.response])
    } catch (error) {
      setErrors([...errors,error.response.data.mensaje])
    }
 
}
  return (
    <>
    <Header titulo={"Cambiar Contraseña"} data={[errors,setErrors]} success={[success,setSuccess]}>
      <Formulario onSubmitData={handleResetPassword}>
            <div >
                <label htmlFor="password">Contraseña</label>
                <input type="password" name='password' value={formState.password} onChange={onInputChange} id="password" className=' w-full px-3 py-4 border border-gray-300 rounded-md placeholder-gray-400' placeholder='Contraseña' />
            </div>
            <div >
                <label htmlFor="repeat_password">Repetir Contraseña</label>
                <input type="password" name='repeat_password' value={formState.repeat_password} onChange={onInputChange}  id="repeat_password" className=' w-full px-3 py-4 border border-gray-300 rounded-md placeholder-gray-400' placeholder='Repetir Contraseña' />
            </div>
          <input type="submit" value={"Cambiar Contraseña"} className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 cursor-pointer' />
      </Formulario>
    </Header>

    </>
  )
}
