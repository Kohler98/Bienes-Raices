import React, { useEffect, useState } from 'react'
import { Header } from '../shared/Header'


import { MostrarPropiedades } from './MostrarPropiedades'
import { useGetCategories, useGetPrices, usePropiedades } from '../../store'
import { crudAxios } from '../../config/axios'
 


export const Home = () => {

  
  const position = {
    lat: 10.511442075505958,
    lng: -66.94999700936103
  }

  const [filter, setFilter] = useState({
    categoria: null,
    precio: null
  })
  const [properties, setProperties] = useState([])
  const [errors, setErrors] = useState([])
  const propiedades = usePropiedades(state => state.propiedades)

  const categories = useGetCategories(state => state.categories)
  const prices = useGetPrices(state => state.prices)

  const filterPropertiesByCategoryAndPrice = async () => {
    const data = {
      categoriaId: filter.categoria,
      precioId: filter.precio
    };
    try {

      const res = await crudAxios.post('/search/filter', data)
      setProperties(res.data.response)

    } catch (error) {
      console.log(error)
    }
  }
  const getPropiedades = async () => {
    try {
      const res = await crudAxios.get('/Properties')

      const propiedades = res.data.response.filter((propiedad) => propiedad.publicado)
      setProperties(propiedades)

    } catch (error) {
      console.log(error)
    }
  }



  const onSelectedValue = (e) => {

    if (!isNaN(e.target.value)) {

      setFilter({
        ...filter,
        [e.target.name]: e.target.value
      })
    } else {
      setFilter({
        ...filter,
        [e.target.name]: null
      })
    }

  }
  useEffect(() => {

    if (filter.categoria || filter.precio) {

      filterPropertiesByCategoryAndPrice()
    }

    if (!filter.categoria && !filter.precio) {

      getPropiedades()

    }
  }, [filter])

  useEffect(() => {
    

    setProperties(propiedades)
    if(propiedades.length <1){
      setFilter({
        categoria: null,
        precio: null
      })
    }

  }, [propiedades])

  return (
    <>
      <Header titulo={'Ubicacion en el Mapa'} data={[errors, setErrors]}>
        <div className="flex flex-col md:flex-row items-center py-10 gap-4">
          <h2 className='text-sm uppercase text-gray-800  font-bold'>Filtrar Propiedades:</h2>

          <div className="w-full md:w-auto flex items-center gap-2">
            <label htmlFor="categorias" className='text-sm w-24 uppercase text-gray-500 font-bold'>Categorias</label>
            <select name="categoria" onChange={onSelectedValue} className='flex-1 bg-white w-full px-3 py-2 border border-gray-300 rounded-md shadow"'>
              <option value={null} >- Seleccione -</option>
              {
                categories.map(category => (
                  <option key={category.id} value={category.id}>{category.nombre}</option>
                ))
              }
            </select>
          </div>
          <div className="w-full md:w-auto flex items-center gap-2">
            <label htmlFor="precios" className='text-sm w-24 uppercase text-gray-500 font-bold'>Precios</label>
            <select name="precio" onChange={onSelectedValue} className='flex-1 bg-white w-full px-3 py-2 border border-gray-300 rounded-md shadow"'>
              <option value={null}>- Seleccione -</option>
              {
                prices.map(price => (
                  <option key={price.id} value={price.id}>{price.nombre}</option>
                ))
              }
            </select>
          </div>

        </div>
              
        {
          properties.length > 0 ?
            (<MostrarPropiedades titulo={'Propiedades'} propiedades={properties} />)
            :
            (<p>No Hay propiedades con el termino especificado</p>)
        }


      </Header>
    </>
  )
}



