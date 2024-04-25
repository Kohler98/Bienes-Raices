import React, { useState } from 'react'
import { MiPropiedad } from './MiPropiedad';

export const MisPropiedades = ({propiedades}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = propiedades.slice(firstItemIndex, lastItemIndex);
    const totalPages = Math.ceil(propiedades.length / itemsPerPage);
   
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
    <div className="bg-white shadow rounded-lg">
        <ul className='divide-y divide-gray-200'>
            {
                currentItems.map((propiedad) =>
                    <MiPropiedad key={propiedad.id} propiedad={propiedad}/>
                    )
            }
        </ul>
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
    </div>
    </>
  )
}
