import React from 'react'
import { Link } from 'react-router-dom'
import casa from '../../../public/assets/R.jpg'
export const MostrarPropiedad = ({propiedad}) => {

  return (
    <>
        <div className="bg-white shadow rounded-lg fade-in">
            <img src={propiedad.imagen} alt="" className='object-cover h-72 w-full'/>
            <div className="p-5 space-y-2">
                <h3 className='text-2xl font-bold'>{propiedad.titulo}</h3>
                <p className='text-sm text-gray-600'>
                    Habitaciones:
                    <span className="text-gray-800 font-bold"> {propiedad.habitaciones}</span>
                </p>
                <p className='text-sm text-gray-600'>
                    WC:
                    <span className="text-gray-800 font-bold"> {propiedad.wc}</span>
                </p>
                <p className='text-sm text-gray-600'>
                    Precio:
                    <span className="text-gray-800 font-bold"> {propiedad.precio}$</span>
                </p>
                <Link to={`/propiedad/${propiedad.id}`}  className='bg-indigo-600 w-full text-center block font-bold text-white p-2 uppercase rounded'>Ver Propiedad</Link>
            </div>
        </div>
    </>
  )
}
 
