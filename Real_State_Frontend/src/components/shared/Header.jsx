import React from 'react'

import { Errors } from './Errors';
import { Success } from './Success';
export const Header = ({ children, titulo = "", data = [], success = [] }) => {

  return (
    <>
      <div className="py-10 ">
        {
          titulo.trim().length > 0 && (
            <>
              <h1 className=' text-4xl my-10 font-extrabol text-center '>
                Bienes <span className='font-normal'>Raices</span>
              </h1>

              <h2 className=' text-center text-2xl font-extrabold'>{titulo}</h2>
            </>
          )
        }

        {
          data.length > 0 && (
            <Errors data={data} />

          )
        }
        {
          success.length > 0 && (
            <Success data={success} />
          )
        }
        {children}
      </div>
    </>
  )
}
