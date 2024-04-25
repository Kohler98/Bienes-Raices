import React, { useContext, useEffect } from 'react'
import { UserChatArchive } from './UserChatArchive'
import Previous from '../../shared/Previous'
import { useForm } from '../../../hooks'
import imagen from '/profile/profile.jpg'
import { crudAxios } from '../../../config/axios'
import { useGetHeader } from '../../../store'
import { CRMContext } from '../../context'
import { useNavigate } from 'react-router'

export const SideBarProfile = ({usuarios = [], roomChats = [], config = '',setIsMyImage, setIsMe, setUserImage}) => {
  const navigate = useNavigate()
 
  const [auth, setAuth] = useContext(CRMContext);
  const [roomChat, setRoomChat] = roomChats
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/")
    }
  }, [auth])

  const { formState, onInputChange, setState } = useForm({
    nombre: '',
    apellido: '',
    imagen: imagen,
    
    
  })
  const onHandleGoBack = () => {
    navigate('/administracion')
  }
  
  useEffect(() => {
    const getUserProfile = async () => {

      try {
        const res = await crudAxios.get('/auth/me', config)
 
        const urlImage = res.data.response.url
        setIsMe(res.data.response.id)
   
        setState({
          nombre: res.data.response.nombre,
          apellido: res.data.response.apellido,
          imagen: urlImage.length > 0 ? urlImage : imagen,

        })
        setIsMyImage(urlImage.length > 0 ? urlImage : imagen)
      } catch (error) {

      }
    }
    getUserProfile()
  }, [])
 
  return (
    <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
      <div className="flex flex-row items-center space-x-4 justify-start h-12 w-full">
        <div
          onClick={onHandleGoBack}
          className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10"
        >


          <Previous />

        </div>
        <div className="ml-2 font-bold text-2xl">Go Back</div>
      </div>
      <div
        className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg"
      >
        <div className="h-20 w-25 rounded-full border overflow-hidden">
          <img
            src={formState.imagen}
            alt="Avatar"
            className="h-full w-full"
          />
        </div>
        <div className="text-sm font-semibold mt-2">{formState.nombre} {formState.apellido}</div>

        <div className="flex flex-row items-center mt-3">
          <div
            className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full"
          >
            <div className="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
          </div>
          <div className="leading-none ml-1 text-xs">Active</div>
        </div>
      </div>
      <div className="flex flex-col mt-8">
        <div className="flex flex-row items-center justify-between text-xs">
          <span className="font-bold">Active Conversations</span>
          <span
            className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
          >{usuarios.length}</span>
        </div>
        <div className="flex flex-col space-y-1 mt-4 -mx-2 h-58 overflow-y-auto">

          {
            usuarios.length > 0 && (
              usuarios.map((usuario, index) => (

                <UserChatArchive key={index} usuario={usuario} roomChats={[roomChat, setRoomChat]} setUserImage={setUserImage} />
              ))
            )
          }
        </div>

      </div>
    </div>
  )
}
