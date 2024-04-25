import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CRMContext } from '../context/CRMcontext';

import { crudAxios } from '../../config/axios';
import { useGetPrices, useGetCategories, usePropiedades, useGetHeader } from '../../store';
import { useForm } from '../../hooks/useForm';
import { AuthNavBar } from './AuthNavBar';

export const Navbar = () => {
    const [auth, setAuth, userRole] = useContext(CRMContext);
    const [usuario, setUsuario] = useState({
        imagen:''
    })
    const { formState, onInputChange, setState } = useForm({
        termino: ''
    })
    const categories = useGetCategories(state => state.categories)
    const navigate = useNavigate()


    const prices = useGetPrices(state => state.prices)
    const setCategories = useGetCategories(state => state.setCategories)
    const setPrices = useGetPrices(state => state.setPrices)
    const setPropiedades = usePropiedades(state => state.setPropiedades)

    const setConfig = useGetHeader(state => state.setConfig)

    const token = localStorage.getItem('token') ?? ''
    useEffect(() => {
        const onHandleValidateToken = async () => {
            try {
                const config = {
                    headers: { "Authorization": `Bearer ${token}` }
                };
                const res = await crudAxios.get('auth/me', config)

                setUsuario({imagen:res.data.response.url})
                setAuth({
                    token: res.data.token,
                    isAuthenticated: true,
                    userRole: ""
                })
                setConfig(config)

            } catch (error) {
 
                setAuth({
                    token: "",
                    isAuthenticated: false,
                    userRole: ""
                })
                localStorage.removeItem("token");
            }
        }
        if(token.length > 0){
            onHandleValidateToken()

        }

    }, [auth])

    useEffect(() => {
        if (categories < 1 && prices < 1) {


            const getCategories = async () => {
                try {
                    const res = await crudAxios('/category')
                    const category = res.data.response.map(cat => ({
                        id: cat.id,
                        nombre: cat.nombre
                    }))
                    setCategories(category)
                } catch (error) {
                    console.log(error)

                }
            }

            const getPrices = async () => {
                try {
                    const res = await crudAxios('/prices')
                    const prices = res.data.response.map(price => ({
                        id: price.id,
                        nombre: price.nombre
                    }))
                    setPrices(prices)
                } catch (error) {
                    console.log(error)

                }
            }

            getPrices()
            getCategories()

        }
    }, [])

    const handleCategoryLink = async (e, category) => {
        e.preventDefault()
        try {
            const data = {
                categoriaId: category,

            };
            const res = await crudAxios.post('/search/filter', data)
            const propiedades = res.data.response
            if (propiedades.length > 0) {
                setPropiedades(propiedades)

            }
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }


    const onHandleSearch = async (e) => {
        e.preventDefault()
        try {
            const res = await crudAxios.post("/search", formState)
            setPropiedades(res.data.response)
            setState({ termino: '' })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <header className='bg-indigo-600 p-4'>
                <div className=" container mx-auto flex justify-between items-center">
                    <Link to={'/'} onClick={() => setPropiedades([])}>
                        <h1 className=' text-2xl text-white font-extrabold text-center'>Bienes <span className='font-normal '>Raices</span></h1>
                    </Link>

                    <nav className='my-10 relative flex justify-between text-sm md:flex md:items-center md:gap-3 font-bold text-white sm:hidden'>


                        {
                            auth.isAuthenticated ?

                                (
                                    <AuthNavBar usuario={usuario}/>
                                )
                                :
                                (
                                    <>
                                        <Link to={'/signup'}>
                                            { 'Crear Cuenta '}

                                        </Link>
                                        <Link to={ '/signin'} >
                                            {'Iniciar Sesion'}

                                        </Link>
                                    </>
                                )
                        }
                    </nav>
                </div>
                <div className="bg-indigo-700 py-5  lg:block ">
                    <div className="container mx-auto flex justify-between items-center">
                        <nav className='flex gap-4'>
                            {
                                categories.map(category => (
                                    <Link key={category.id} to="" onClick={(e) => handleCategoryLink(e, category.id)} className="text-sm font-bold uppercase text-white">{category.nombre}</Link>
                                ))
                            }


                        </nav>
                        <form className='flex relative gap-3 items-center' onSubmit={onHandleSearch}>
                            <label htmlFor="termino" className=' text-sm uppercase font-bold text-white'>Buscar</label>
                            <input
                                type="text"
                                name="termino"

                                onChange={onInputChange}
                                value={formState.termino}
                                placeholder='Buscar Propiedades'
                                className='p-2 rounded-lg shadow text-sm'
                            />
                            <input
                                type="submit"
                                className='bg-indigo-800 hover:bg-indigo-400 rounded-lg text-white uppercase font-bold p-2 cursor-pointer text-sm'
                                value={'buscar'}
                            />
                        </form>
                    </div>
                </div>
            </header>

        </div>
    )
}
