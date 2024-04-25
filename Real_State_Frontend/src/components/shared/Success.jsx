import React, { useEffect } from 'react'
import { useLocation } from 'react-router';
import { AnimatePresence, motion } from "framer-motion";
export const Success = ({data}) => {
        
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
    const [success,setSuccess] = data
    useEffect(() => {
        const duracionIntervalo = 3000 / success.length;

        const intervalo = setInterval(() => {
            if (success.length > 0) {
            setSuccess((prevArreglo) => prevArreglo.slice(1));
            } else {
            clearInterval(intervalo);
            }
        }, duracionIntervalo);

        return () => {
            clearInterval(intervalo);
        };
    }, [success]);
  return (
    <>
      
      {(success ?
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
                {success.map((error,key)=>(
                    <p key={key} className=' bg-green-600 text-white uppercase text-xs text-center p-2 mb-1 font-bold'>{error}</p>
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
