import React, { useContext, useEffect, useState } from 'react'
import { Header } from '../shared/Header'
import { Link, useNavigate } from 'react-router-dom'
import { MisPropiedades } from './MisPropiedades'
import { CRMContext } from '../context'
import { crudAxios } from '../../config/axios'
import { useGetHeader, usePropiedades } from '../../store'

export const PanelAdministracion = () => {
  const navigate = useNavigate()
  const [auth, setAuth] = useContext(CRMContext);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/")
    }
  }, [auth])
  const config = useGetHeader(state => state.config)
  const setMisPropiedades = usePropiedades(state => state.setMisPropiedades)
  const misPropiedades = usePropiedades(state=> state.misPropiedades)
  const [errors, setErrors] = useState([])
  const [propiedades, setPropiedades] = useState([])
 
  useEffect(() => {
 

      const getProperties = async () => {
        try {
          
          const res = await crudAxios.get('/me', config)
 
          setPropiedades(res.data.response)
          setMisPropiedades(res.data.response)
        } catch (error) {
          console.log(error)
        }
      }
      getProperties()
 
  }, [])
  return (
    <>

      <Header titulo={'Panel de Administracion'} data={[errors, setErrors]}>
        <div className="grid mx-5 grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          <Link to={'/crear'} className="rounded py-2  px-10 bg-indigo-600 hover:bg-indigo-700 text-sm font-bold text-center text-white uppercase my-5 inline-block w-full sm:w-auto">Publicar Propiedad</Link>
          <Link to={'/profile'} className="rounded py-2  px-10 bg-green-600 hover:bg-green-700 text-sm font-bold text-center text-white uppercase my-5 inline-block w-full sm:w-auto">Ver Perfil</Link>
          <Link to={'/message'} className="rounded py-2  px-10 bg-blue-600 hover:bg-blue-700 text-sm font-bold text-center text-white uppercase my-5 inline-block w-full sm:w-auto">Ver Mensajes</Link>

        </div>
        {
          misPropiedades.length > 0 ?

            <MisPropiedades propiedades={misPropiedades} />

            :
            <p className='text-center'>No hay propiedades</p>
        }
      </Header>
    </>
  )
}
