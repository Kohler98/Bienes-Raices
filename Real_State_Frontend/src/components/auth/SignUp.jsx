import React, { useContext, useEffect, useState } from 'react'
import { Formulario } from '../shared/Formulario'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { Header } from '../shared/Header'
import { CRMContext } from '../context'
import { crudAxios } from '../../config/axios'

export const SignUp = () => {
    const {formState, onInputChange,onResetForm} = useForm({nombre:'',apellido:'',email:'',password:''})
    const [errors,setErrors] = useState([])
    const [success,setSuccess] = useState([])
    const navigate = useNavigate()
    const [auth, setAuth] = useContext(CRMContext);
    useEffect(()=>{
        if(auth.isAuthenticated){
            navigate("/administracion")
        }
    },[auth])
    const handleRegisternUser = async (e) =>{
        e.preventDefault()
 
        try {
            const res = await crudAxios.post("auth/signup", formState)

    
            setSuccess([...success,res.data.response])
            onResetForm()
        } catch (error) {
            console.log(res.response.data)
        }
    }

  return (
    <>
    <Header titulo={"Registro"} data={[errors,setErrors]} success={[success,setSuccess]} >
        <Formulario onSubmitData={handleRegisternUser}>
            <div  >
                <label htmlFor="text" className=' block text-sm uppercase text-gray-500 mb-3 font-bold'>Nombre</label>
                <input type="text" name='nombre' value={formState.nombre} onChange={onInputChange} id="nombre" className=' w-full px-3 py-4 border border-gray-300 rounded-md placeholder-gray-400' placeholder='Tu Email'/>
            </div>
            <div  >
                <label htmlFor="text" className=' block text-sm uppercase text-gray-500 mb-3 font-bold'>apellido</label>
                <input type="text" name='apellido' value={formState.apellido} onChange={onInputChange} id="apellido" className=' w-full px-3 py-4 border border-gray-300 rounded-md placeholder-gray-400' placeholder='Tu Email'/>
            </div>
            <div  >
                <label htmlFor="email" className=' block text-sm uppercase text-gray-500 mb-3 font-bold'>Email</label>
                <input type="email" name='email' value={formState.email} onChange={onInputChange} id="email" className=' w-full px-3 py-4 border border-gray-300 rounded-md placeholder-gray-400' placeholder='Tu Email'/>
            </div>
            <div >
                <label htmlFor="password">Contraseña</label>
                <input type="password" name='password' value={formState.password} onChange={onInputChange} id="password" className=' w-full px-3 py-4 border border-gray-300 rounded-md placeholder-gray-400' placeholder='Contraseña' />
            </div>

            <div className=" flex items-center justify-between ">
                <Link to="/signin" className=" text-gray-500 text-xs"> Ya tienes cuenta? Inicia Sesion</Link>
                <Link to="/forgot_password" className=" text-gray-500 text-xs">Olvide mi contraseña </Link>
            </div>
            <input type="submit" value={"Registrarse"} className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 cursor-pointer' />
        </Formulario>
    </Header>
    </>
  )
}
