import React, { useEffect } from 'react'

import { Mapa } from '../shared/Mapa'
import { useGetCategories, useGetPrices, usePropiedades } from '../../store'
import { Link, useNavigate } from 'react-router-dom'

export const FormularioPropiedades = ({ data }) => {
    const categories = useGetCategories(state => state.categories)
    const prices = useGetPrices(state => state.prices)
    const propiedad = usePropiedades(state => state.propiedad)
    const onInputChange = usePropiedades(state => state.onInputChange)
    const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const [errors, setErrors] = data
 
    const navigate = useNavigate()
    const position = {
        lat: 10.511442075505958,
        lng: -66.94999700936103
    }
    const isEmptyObject = (obj) => {
        for (const prop in obj) {
            if (prop !== "id" && prop !== "imagen") {
                if (typeof obj[prop] === "string" && obj[prop] === "") {
                    return true;
                }
            }
        }
        return false;
    }
 
    const onHandleSubmitData = (e) => {
        e.preventDefault()
        if (isEmptyObject(propiedad)) {
            setErrors([...errors, "todos los campos deben esta completos antes de subir una imagen"])
            return
        }else{
            navigate('/images')
        }

    }
    return (
        <>
            <div className="bg-white shadow py-8 px-4 rounded mx-auto max-w-4xl my-10 md:px-10">
                <form action="" className='space-y-8'>
                    <div className="space-y-8 ">
                        <h3 className=' text-lg leading-6 font-medium text-gray-900'>
                            Informacion General
                        </h3>
                        <p className='text-gray-600'>Añade Informacion sobre la propiedad en venta </p>
                        <div>
                            <label htmlFor="titulo" className="block text-sm uppercase text-gray-500 mb-3 font-bold">Titulo de Anuncio</label>
                            <input type="text" name='titulo' value={propiedad.titulo} onChange={(e) => onInputChange(e)} placeholder="Titulo Propiedad, ej Casa en la playa" className="w-full px-3 py-4 border border-gray-300 rounded-md placeholder-gray-400" />
                        </div>
                        <div>
                            <label htmlFor="" className="block text-sm uppercase text-gray-500 mb-3 font-bold">Descripcion</label>
                            <textarea name="descripcion" value={propiedad.descripcion} onChange={(e) => onInputChange(e)} placeholder="Titulo Propiedad, ej Casa en la playa" id="descripcion" cols="30" rows="10" className="w-full px-3 py-4 border border-gray-300 rounded-md placeholder-gray-400"></textarea>
                        </div>
                        <div className="md:flex md:gap-4 space-y-5 md:space-y-0">
                            <div className="md:w-1/3">
                                <label htmlFor="categoria" className="block text-sm uppercase text-gray-500 mb-3 font-bold">Categoria</label>
                                <select name="category" value={propiedad.category} onChange={(e) => onInputChange(e)} className="w-full px-3 py-4 border border-gray-300 rounded-md placeholder-gray-400">
                                    <option value="">- Selecione - </option>
                                    {
                                        categories.map(category => (

                                            <option key={category.id} value={category.id}>{category.nombre}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="md:w-1/3">
                                <label htmlFor="precio" className="block text-sm uppercase text-gray-500 mb-3 font-bold">Precio</label>
                                <select name="precio" value={propiedad.precio} onChange={(e) => onInputChange(e)} className="w-full px-3 py-4 border border-gray-300 rounded-md placeholder-gray-400">
                                    <option value="">- Selecione - </option>
                                    {
                                        prices.map(price => (
                                            <option key={price.id} value={price.id}>{price.nombre}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="md:w-1/3">
                                <label htmlFor="habitaciones" className="block text-sm uppercase text-gray-500 mb-3 font-bold">Habitaciones</label>
                                <select name="habitaciones" value={propiedad.habitaciones} onChange={(e) => onInputChange(e)} className="w-full px-3 py-4 border border-gray-300 rounded-md placeholder-gray-400">
                                    <option value="">- Selecione - </option>
                                    {numeros.map(value => (

                                        <option value={value} key={value}>{value}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="md:w-1/3">
                                <label htmlFor="estacionamiento" className="block text-sm uppercase text-gray-500 mb-3 font-bold">Estacionamiento</label>
                                <select name="estacionamiento" value={propiedad.estacionamiento} onChange={(e) => onInputChange(e)} className="w-full px-3 py-4 border border-gray-300 rounded-md placeholder-gray-400">
                                    <option value="">- Selecione - </option>
                                    {numeros.map(value => (

                                        <option value={value} key={value}>{value}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="md:w-1/3">
                                <label htmlFor="wc" className="block text-sm uppercase text-gray-500 mb-3 font-bold">Wc</label>
                                <select name="wc" value={propiedad.wc} onChange={(e) => onInputChange(e)} className="w-full px-3 py-4 border border-gray-300 rounded-md placeholder-gray-400">
                                    <option value="">- Selecione - </option>
                                    {numeros.map(value => (

                                        <option value={value} key={value}>{value}</option>
                                    ))}
                                </select>
                            </div>

                        </div>
                        <div className="md:flex md:gap-4 space-y-5 md:space-y-0">
                            <div className="md:w-1/3">
                                <label htmlFor="state" className="block text-sm uppercase text-gray-500 mb-3 font-bold">Estado</label>
                                <input name="state" type='text' value={propiedad.state} onChange={(e) => onInputChange(e)} className="w-full px-3 py-4 border border-gray-300 rounded-md placeholder-gray-400" readOnly />

                            </div>
                            <div className="md:w-1/3">
                                <label htmlFor="city" className="block text-sm uppercase text-gray-500 mb-3 font-bold">Ciudad</label>
                                <input name="city" type='text' value={propiedad.city} onChange={(e) => onInputChange(e)} className="w-full px-3 py-4 border border-gray-300 rounded-md placeholder-gray-400" readOnly />
                            </div>
                            <div className="md:w-1/3">
                                <label htmlFor="country" className="block text-sm uppercase text-gray-500 mb-3 font-bold">Pais</label>
                                <input name="country" type='text' value={propiedad.country} onChange={(e) => onInputChange(e)} className="w-full px-3 py-4 border border-gray-300 rounded-md placeholder-gray-400" readOnly />
                            </div>
                            <div className="md:w-1/3">
                                <label htmlFor="road" className="block text-sm uppercase text-gray-500 mb-3 font-bold">Calle</label>
                                <input name="road" type='text' value={propiedad.road} onChange={(e) => onInputChange(e)} className="w-full px-3 py-4 border border-gray-300 rounded-md placeholder-gray-400" readOnly />
                            </div>
                        </div>
                        <div className="border-gray-200-border-t py-5 space-y-5">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Ubicacion</h3>
                            <p className="text-gray-600">Ubica la propiedad en el mapa</p>
                            <div id="mapa" className="w-full h-85 mb-4">
                                <Mapa LatLng={position} isDragable={true} />
                            </div>
                        </div>

                        <input type="submit" onClick={onHandleSubmitData}   className={`w-full text-center py-3 ${isEmptyObject(propiedad) ? '  bg-indigo-300' : 'fade-in bg-indigo-600 hover:bg-indigo-700'}  rounded text-white font-bold uppercase cursor-pointer`} value={"Subir imagen"}/>


                        {/* <AgregarImagen data={[images, setImages]} /> */}
                        {/* <input type="submit" className='w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-bold uppercase cursor-pointer' value="Publicar Propiedad" /> */}
                    </div>
                </form>
            </div>
        </>
    )
}
