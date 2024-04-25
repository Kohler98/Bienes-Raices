import React, { useState } from 'react'
import { MostrarPropiedad } from './MostrarPropiedad'

export const MostrarPropiedades = ({titulo,propiedades}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = propiedades.slice(firstItemIndex, lastItemIndex);
  const totalPages = Math.ceil(propiedades.length / itemsPerPage);
 
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
 
  return (
    <>
      <section className="py-5 ">
          <h2 className='text-center text-4xl font-extrabold pt-18'>{titulo}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">

              {propiedades? currentItems.map((propiedad,i)=>
                  <MostrarPropiedad propiedad={propiedad} key={i}/>
                  ): ''}

          </div>
          
    </section>
    {
      totalPages >1   ?
      <div className="flex justify-center mt-8">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => paginate(index + 1)}
          className={`mx-2 px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
        >
          {index + 1}
        </button>
      ))}
    </div>
      :
      ''
    }

  </>
  )
}
