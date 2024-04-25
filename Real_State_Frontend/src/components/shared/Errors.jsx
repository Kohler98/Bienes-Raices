import React, { useEffect } from 'react'
import { useLocation } from 'react-router';
import { AnimatePresence, motion } from "framer-motion";
export const Errors = ({data}) => {
        
    const location = useLocation();
    const pageTransition = {
        in: {
          opacity: 1,
          y: 0,
        },
        out: {
          opacity: 0,
          y: -50,
        },
      };
    const [errors,setErrors] = data
    useEffect(() => {
        const duracionIntervalo = 3000 / errors.length;

        const intervalo = setInterval(() => {
            if (errors.length > 0) {
            setErrors((prevArreglo) => prevArreglo.slice(1));
            } else {
            clearInterval(intervalo);
            }
        }, duracionIntervalo);

        return () => {
            clearInterval(intervalo);
        };
    }, [errors]);
  return (
    <>
      
      {(errors ?
          <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="out"
            animate="in"
            exit="out"
            variants={pageTransition}
            transition={{ duration: 0.2 }}
          >
            <div className=" max-w-md mx-auto my-10 ">
                {errors.map((error,key)=>(
                    <p key={key} className=' bg-red-600 text-white uppercase text-xs text-center p-2 mb-1 font-bold'>{error}</p>
                ))}
            </div> 
        </motion.div>
        </AnimatePresence>
        : 
        '')
        }
    </>
  )
}
