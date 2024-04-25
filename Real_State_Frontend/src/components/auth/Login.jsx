import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formulario } from '../shared/Formulario'
import { useForm } from '../../hooks/useForm'
import { Header } from '../shared/Header'
import {crudAxios} from '../../config/axios'
import { CRMContext } from '../context/CRMcontext'
import { useGetHeader } from '../../store'

export const Login = () => {

    const {formState, onInputChange} = useForm({email:'',password:''})
    const [errors,setErrors] = useState([])
    const navigation = useNavigate()
    const [auth, setAuth] = useContext(CRMContext);

    const setConfig = useGetHeader(state =>state.setConfig)
    useEffect(()=>{
        if(auth.isAuthenticated){
 
            const config = {
                headers: { "Authorization": `Bearer ${auth.token}` }
              };
 
            setConfig(config)
            localStorage.setItem('token', auth.token)
            navigation("/administracion")
        }
    },[auth])


    const handleAuntenticationUser = async(e) =>{
        e.preventDefault()
        try {
            const res = await crudAxios.post("/auth/signin",formState)

            setAuth({
                token: res.data.token,
                isAuthenticated: true,
                userRole:""
            })

 

        } catch (error) {
            setErrors([...errors,error.response.data.mensaje])
        }
 
    }
    return (
    <>
    <Header titulo={"Inicia Sesion"} data={[errors,setErrors]}>
        <Formulario onSubmitData={handleAuntenticationUser}>
            <div  >
                <label htmlFor="email" className=' block text-sm uppercase text-gray-500 mb-3 font-bold'>Email</label>
                <input type="email" name='email' value={formState.email} onChange={onInputChange} id="email" className=' w-full px-3 py-4 border border-gray-300 rounded-md placeholder-gray-400' placeholder='Tu Email'/>
            </div>
            <div >
                <label htmlFor="password">Password</label>
                <input type="password" name='password' value={formState.password} onChange={onInputChange}  id="password" className=' w-full px-3 py-4 border border-gray-300 rounded-md placeholder-gray-400' placeholder='Contraseña' />
            </div>
            <div className=" flex items-center justify-between ">
                <Link to="/signup" className=" text-gray-500 text-xs">No tienes cuente? Crea una </Link>
                <Link to="/forgot_password" className=" text-gray-500 text-xs">Olvide mi contraseña </Link>
            </div>
            <input type="submit" value={"Iniciar Sesion"} className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 cursor-pointer' />
        </Formulario>
    </Header>

    </>
  )
}
