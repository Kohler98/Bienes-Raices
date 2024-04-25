import React, { useContext, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Header } from '../shared';
import { useGetHeader, usePropiedades } from '../../store';
import { useNavigate } from 'react-router';
import { CRMContext } from '../context';
import { crudAxios } from '../../config/axios';
 
const isEmptyObject = (obj = {}) => {
  for (const prop in obj) {
      if (prop !== "id" && prop !== "imagen") {
          if (typeof obj[prop] === "string" && obj[prop] === "") {
              return true;
          }
      }
  }
  return false;
}
export const AgregarImagen = () => {
 
  const propiedad = usePropiedades(state => state.propiedad)
  const setPropiedad = usePropiedades(state => state.setPropiedad)
  const [images, setImages] = useState([])
  const navigate = useNavigate()
  const [auth, setAuth] = useContext(CRMContext);

  useEffect(()=>{
    if(!auth.isAuthenticated){
      navigate("/")
    }
  },[auth])
  if(isEmptyObject(propiedad)){
    navigate(-1)
  }
 
  const [errors,setErrors] = useState([])

  useEffect(() => {
    setPropiedad({
        ...propiedad,
        imagen: images[0]
    })
 
  }, [images])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': []
    },
    onDrop: (acceptedFiles) => {
      setImages(acceptedFiles);
    },
  });
 
  const onHandleSubmitData = async(e) =>{
    e.preventDefault()
    const config = useGetHeader(state => state.config)
    if(images.length>0){
      const formData = new FormData();
      formData.append("Titulo",propiedad.titulo);
      formData.append("Descripcion",propiedad.descripcion);
      formData.append("Habitaciones",propiedad.habitaciones);
      formData.append("Estacionamiento",propiedad.estacionamiento);
      formData.append("Wc",propiedad.wc);
      formData.append("Calle",propiedad.road);
      formData.append("Publicado",true);
      formData.append("Lat",propiedad.lat);
      formData.append("Lng",propiedad.lng);
      formData.append("Precio",propiedad.precio);
      formData.append("Category",propiedad.category);
      formData.append("Imagen",propiedad.imagen);
      try{
        if(propiedad.id.length > 0){
          console.log("editando")
          formData.append("Id",propiedad.id);
          try {
            const res = await crudAxios.put(`/Properties/edit/${propiedad.id}`,formData,config)
            console.log(res.data)
            navigate("/")
          } catch (error) {
            console.log(error)
          }
        }else{
          console.log("creando")
          try {
            const res = await crudAxios.post('/Properties',formData,config)
            console.log(res.data)
            navigate("/")
          } catch (error) {
            console.log(error)
          }

        }
      }catch(error){
        console.log(error.response)
        setErrors([...errors,error.response.data.mensaje])
 
      }
    }else{
      setErrors([...errors,"Para poder publicar una propiedad debe subir una imagen"])
    }
  }
  return (

    <Header titulo={`Imagen para ${propiedad.titulo}`} data={[errors,setErrors]}>
      <div className="bg-white shadow py-8 px-4 rounded mx-auto max-w-4xl my-10 md:px-10">
        <div {...getRootProps()} className='dropzone border-dashed border-2 w-full min:h-96 h-auto rounder flex-col justify-center items-center' >
          <input {...getInputProps()} type="hidden" name="" />
          {isDragActive ? (
            ''
          ) : (
            <FontAwesomeIcon icon={faTimes} size="3x" className="cross-icon" />
          )}
          <div>
            {images.length > 0 ? (
              images.map((image, index) => (
                <img key={index} src={URL.createObjectURL(image)} alt={`Imagen ${index}`} />
              ))) : ''}
          </div>
        </div>
        <button onClick={onHandleSubmitData} type="submit" className='w-full mt-5 py-3 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-bold uppercase cursor-pointer'  >Publicar Propiedad</button>
      </div>
    </Header>

  )
}
