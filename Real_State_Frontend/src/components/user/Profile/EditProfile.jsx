import React, { useEffect, useRef, useState } from 'react'
import { useForm } from '../../../hooks'
import image from '/public/profile/profile.jpg'
import { crudAxios } from '../../../config/axios'
import { useGetHeader } from '../../../store'
import { useNavigate } from 'react-router'
import { Header } from '../../shared'
export const EditProfile = () => {
    const ref = useRef()
    
    const config = useGetHeader(state => state.config)
    const [refresh, setRefresh] = useState(false)
    const [imagen, setImagen] = useState(null)
    const [url,setUrl] = useState("")
    const [sucess, setSuccess] = useState("")
    const { formState, onInputChange, setState } = useForm({
        id:'',
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        imagen: null,


    })
    const onHandleDeleteImage = (e)=>{

        setImagen(url)
        setState({
            ...formState,
            imagen:url
        })
 
    }
    const onHandleSaveImage = (e) => {
        e.preventDefault();
    
        const imageFile = e.target.files[0];
    
        if (imageFile && imageFile.type.startsWith('image/')) {
            setState({
                ...formState,
                [e.target.name]: imageFile
            });
    
            const imageUrl = URL.createObjectURL(imageFile);
            setImagen(imageUrl);
        } else {
            // Mostrar mensaje de error o tomar otra acción si no es una imagen
            console.log('Por favor selecciona un archivo de imagen válido.');
        }
    }
    const onHandleSubmitChange = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("Nombre", formState.nombre);
        formData.append("Apellido", formState.apellido);
        formData.append("Email", formState.email);
        formData.append("Password", formState.password);
        formData.append("Imagen", formState.imagen);
        try {
            const res = await crudAxios.put(`/auth/edit/${formState.id}`,formData)
            setSuccess([...sucess,res.data.response])
            setRefresh(!refresh)
            
        } catch (error) {
            console.log(error)
        }
 
    }
    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const res = await crudAxios.get('/auth/me', config)

                const urlImage = res.data.response.url
 
                setState({
                    id:res.data.response.id,
                    nombre: res.data.response.nombre,
                    apellido: res.data.response.apellido,
                    imagen: urlImage.length > 0 ? urlImage : image,
                    email: res.data.response.email,
                    password:''
                })
                console.log(urlImage)
                setImagen(urlImage)
                setUrl(urlImage)
            } catch (error) {

            }
        }
        getUserProfile()
    }, [refresh])
    return (
        <Header success={[sucess, setSuccess] }> 
        <div className="w-full px-6 pb-8 mt-[-15px] sm:max-w-xl sm:rounded-lg">
            <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>

            <div className="grid max-w-2xl mx-auto mt-8">
                <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">

                    <img className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                        src={formState.imagen ? imagen : image}
                        alt="Bordered avatar" />

                    <div className="flex flex-col space-y-5 sm:ml-8">
                        <input
                            type="file"
                            name="imagen"
                            onChange={onHandleSaveImage}
                            style={{ display: "none" }}
                            ref={ref}
                        />
                        <button type="button"
                            className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                            onClick={() => ref.current.click()}
                        >
                            Change picture
                        </button>
                        <button type="button"
                            onClick={onHandleDeleteImage}
                            className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                            Delete picture
                        </button>
                    </div>
                </div>

                <div className="items-center mt-8 sm:mt-14 text-[#202142]">

                    <div
                        className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                        <div className="w-full">
                            <label htmlFor="nombre"
                                className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your
                                first name</label>
                            <input type="text" name='nombre'
                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                placeholder="Your first name" value={formState.nombre} onChange={onInputChange} />
                        </div>

                        <div className="w-full">
                            <label htmlFor="apellido"
                                className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your
                                last name</label>
                            <input type="text" name='apellido'
                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                placeholder="Your last name" value={formState.apellido} onChange={onInputChange} />
                        </div>

                    </div>

                    <div className="mb-2 sm:mb-6">
                        <label htmlFor="email"
                            className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your
                            email</label>
                        <input type="email" name='email'
                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                            placeholder="your.email@mail.com" value={formState.email} onChange={onInputChange} />
                    </div>

                    <div className="mb-2 sm:mb-6" >
                        <label htmlFor="password"
                            className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Contraseña</label>
                        <input type="password"
                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                            placeholder="contraseña" name='password' value={formState.password} onChange={onInputChange} />
                    </div>




                    <div className="flex flex-col justify-end">
                        <button type="submit"
                            onClick={onHandleSubmitChange}
                            className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Save</button>
                    </div>

                </div>
            </div>
        </div>
        </Header>
    )
}
