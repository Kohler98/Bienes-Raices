import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGetHeader, usePropiedades } from '../../store'
import { crudAxios } from '../../config/axios'

export const MiPropiedad = ({ propiedad }) => {
    const config = useGetHeader(state => state.config)
    const setPropiedad = usePropiedades(state => state.setPropiedad)
    const setMisPropiedades = usePropiedades(state => state.setMisPropiedades)
    const misPropiedades = usePropiedades(state => state.misPropiedades)
    const navigate = useNavigate()

    const onHandleChangePublicado = async () => {

        const formData = new FormData();
        formData.append("Publicado", !propiedad.publicado);
        try {
            await crudAxios.put(`/Properties/edit/${propiedad.id}`, formData, config)
            const nuevaMisPropiedades = misPropiedades.map((prop) => {
                if (prop.id === propiedad.id) {
                    return { ...prop, publicado: !prop.publicado };
                }
                return prop;
            });

            setMisPropiedades(nuevaMisPropiedades);


        } catch (error) {
            console.log(error)
        }
    }
    const onHandleDelete = async () => {

        try {
            await crudAxios.delete(`/Properties/${propiedad.id}`, config)
            const newMisPropiedades = misPropiedades.filter((prop) => prop.id != propiedad.id)
            setMisPropiedades(newMisPropiedades)

        } catch (error) {

        }
    }
    const onHandleEdit = () => {
        setPropiedad(propiedad)
        navigate('/editar')
    }
    return (
        <>
            <li className='fade-in'>
                <div className="p-6 w-full flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-8 gap-4">
                    <div className="sm:w-1/4 md:w-1/6">
                        <img src={propiedad.imagen} alt="" className='w-full block' />
                    </div>
                    <div className="sm:w-2/4 md:w-3/6 lg:w-4/6">
                        <Link to={`/propiedad/${propiedad.id}`} className='block text-2x1 font-extrabold text-indigo-600 truncate'>
                            {propiedad.titulo}
                        </Link>

                        <p className="text-sm text-black font-bold">{propiedad.category}</p>
                        <p className="md:flex md:gap-1 items-center text-sm text-gray-500 font-bold">

                            {propiedad.precio}
                        </p>
                        <Link to={'#'} className="text-sm text-gray-600">Mensajes</Link>
                    </div>
                </div>
                <div className="sm:w-1/4 md:w-2/6 flex flex-col lg:flex-row gap-2">
                    <button type='button' onClick={onHandleChangePublicado} className={`w-full px-2 py-2 md:py-1 text-xs leading-5 font-semibold rounded cursor-pointer  ${propiedad.publicado ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'} `}>{propiedad.publicado ? 'publicado' : 'no publicado'}</button>
                    <button type='button' onClick={onHandleDelete} className='w-full px-2 py-2 md:py-1 text-xs leading-5 font-semibold rounded cursor-pointer bg-red-100 text-red-800'>Eliminar</button>
                    <button type='button' onClick={onHandleEdit} className='w-full text-center px-2 py-2 md:py-1 text-xs leading-5 font-semibold rounded cursor-pointer bg-indigo-100 text-indigo-800'>Editar</button>
                </div>
            </li>
        </>
    )
}
