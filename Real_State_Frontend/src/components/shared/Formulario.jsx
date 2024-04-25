import React from 'react'

export const Formulario = ({ children, onSubmitData }) => {
  return (
    <>

      <div className=" mt-8 mx-auto max-w-md ">
          <div className=" bg-white py-8 px-4 shadow">
              <form action="POST" className='space-y-5' onSubmit={onSubmitData}>
                  {children}
              </form>
          </div>
      </div>

    </>
  )
}
