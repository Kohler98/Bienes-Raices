import React, { useContext, useEffect, useState } from 'react'
import { Header } from '../shared/Header'
import { Link, useParams } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { Mapa } from '../shared/Mapa'
import * as signalR from "@microsoft/signalr";
import { CRMContext } from '../context/CRMcontext'
import { Errors } from '../shared/Errors'
import { crudAxios } from '../../config/axios'
import { useGetHeader, usePropiedades } from '../../store'
export const PropiedadCard = () => {

    const [errors, setErrors] = useState([])
    const propiedad = usePropiedades(state => state.propiedad)
    const [auth, setAuth, userRole] = useContext(CRMContext);
    const params = useParams()
    const [property, setProperty] = useState({})
    const [mapa, setMapa] = useState(<></>)
    const config = useGetHeader(state => state.config)
    const [position, setPosition] = useState({
        lat: 0,
        lng: 0
    })
 
    const id = params.id
    const { formState, onInputChange, setState, onResetForm } = useForm({
        message: '',
        propiedadId: id
    })
    let connection = new signalR.HubConnectionBuilder().withUrl(`${import.meta.env.VITE_APP_BACKEND_URL}/websocket`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      }).build()
    

 

    const onSubmitMessage = async (e) => {
        e.preventDefault()


        try {
            const res = await crudAxios.post("/message", formState, config)
            console.log()

            connection.start().then(function () {
                connection.invoke("SendMessageToUser", res.data.response.roomChat, formState.mensaje).catch(function(err) {
                    return console.error(err.toString());
                });
                })
            onResetForm()
        } catch (error) {
            setErrors([...errors,error.response.data.mensaje])
     
        }
    }
    // useEffect(()=>{
    //     const propiedad = usePropiedades(state => state.propiedad)
    // },[])

    useEffect(() => {
        const getPropiedad = async () => {

            try {
                const res = await crudAxios(`/Properties/${id}`)

                setProperty(res.data.response)

            } catch (error) {
                console.log(error)
            }
        }
        getPropiedad()
        
    }, [id])

    useEffect(() => {

        if (property) {
            setPosition({
                lat: property.lat,
                lng: property.lng
            })
            if ((position.lat && position.lng) && (position.lat != 0 && position.lng != 0)) {

                let mapa = <Mapa data={[formState, onInputChange, setState]} LatLng={position} isDragable={false} />
                setMapa(mapa)
            }
        }

    }, [property])
    // console.log("asd")
    return (
        <>
            <Header titulo={property.titulo} >
                <div className='w-full mx-10'>


                    <div>
                        <Link to={'#'} className='font-bold text-gray-600 text-sm'>
                            Categoria:
                            <span className="font-normal"> {property.category}</span>
                        </Link>
                    </div>
                    <div className="mt-5 md:flex md:gap-4">
                        <div className="md:w-2/3">
                            <img src={property.imagen} alt="" />
                        </div>

                        <div className="px-5 py-10 space-y-8 bg-white shadow rounded-lg">
                            <p>Descripcion</p>
                            <span className="text-gray-800 block text-lg">{property.descripcion}</span>
                            <h2 className="text-2xl leading-6 font-bold text-gray-900">Informacion Propiedad </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <p className="text-gray-600 font-bold text-xs">
                                    WC
                                    <span className="text-gray-800 block text-lg">{property.wc}</span>
                                </p>
                                <p className="text-gray-600 font-bold text-xs">
                                    Habitaciones
                                    <span className="text-gray-800 block text-lg">{property.habitaciones}</span>
                                </p>
                                <p className="text-gray-600 font-bold text-xs">
                                    Estacionamiento
                                    <span className="text-gray-800 block text-lg">{property.estacionamiento}</span>
                                </p>
                                <p className="text-gray-600 font-bold text-xs">
                                    Precio:
                                    <span className="text-gray-800 block text-lg"> {property.precio}</span>
                                </p>
                            </div>

                        </div>

                    </div>
                    <div className='mt-5 md:flex md:gap-4'>


                        <div className="md:w-2/5 shadow rounded-lg">
                            <h3 className="text-center py-10 leading-6 text-2xl font-bold text-gray-900"> Ubicacion</h3>
                            <div className="h-50">

                 
                                {mapa}

                            </div>
                            <div className="p-10">
                                <p className="text-gray-600 font-bold text-xs">
                                    Direccion
                                    <span className="text-gray-800 block text-lg"> {property.calle}, {propiedad.state}, {propiedad.city}, {propiedad.country}</span>
                                </p>

                            </div>
                        </div>
                        <div className="md:w-1/2   shadow rounded-lg">
                            {
                                auth.isAuthenticated ?
                                    userRole == "USER_SELLER" ?
                                        <h3 className="text-2xl text-center my-10 font-extrabold text-gray-900">Vendedor</h3>
                                        :
                                        <div className="">
                                            <Errors data={[errors, setErrors]} />
                                            <div className="space-y-5 ">

                                                <form action="" onSubmit={onSubmitMessage}>
                                                    <label htmlFor="Mensaje" className="text-2xl  my-10 font-extrabold text-gray-900 flex justify-center gap-2">Mensaje</label>
                                                    <textarea name="message" value={formState.message} onChange={onInputChange} className='w-5/6 py-2 px-5 ml-12 mb-6 border border-gray-300 rounded-lg shadow placeholder-gray-400' placeholder="Coloca tu mensaje aqui" cols="30" rows="10"></textarea>
                                                    <input type="submit" value="enviar mensaje" className="w-5/6 py-2 px-5 ml-12 mb-6 bg-indigo-600 text-white font-bold uppercase text-sm  p-2 cursor-pointer" />
                                                </form>
                                            </div>

                                        </div>
                                    :
                                    <div className="flex justify-center gap-2">
                                        <p className="text-center">
                                            Si deseas contactar al vendedor
                                        </p>
                                        <Link to={"/signup"} className="text-indigo-600">debes crear una cuenta </Link>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </Header>
        </>
    )
}
