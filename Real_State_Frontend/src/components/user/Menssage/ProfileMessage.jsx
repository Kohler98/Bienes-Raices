import React, { useContext, useEffect, useState } from 'react'
import { SideBarProfile } from './SideBarProfile'
import { crudAxios } from '../../../config/axios'
import { useGetHeader } from '../../../store'
import { LayoutChatComponent } from './layoutChatComponent'

import { CRMContext } from '../../context'
import { getConnection } from '../../../config'
export const ProfileMessage = () => {
  const [roomChat, setRoomChat] = useState('')
  const [usuarios, setUsuarios] = useState([])
  const [isMe, setIsMe] = useState('')
  const [connection, setConnection] = useState(null)
  const [isMyImage, setIsMyImage] = useState('')
  const [chats, setChats] = useState([])
  const [isOwner, setIsOwner] = useState(false)
  const config = useGetHeader(state => state.config)
  const [auth, setAuth] = useContext(CRMContext);
  const [chat, setChat] = useState({})

  const [userImage, setUserImage] = useState("")

  useEffect(() => {
    if (isMe.length > 0) {
      let connection = getConnection(isMe, auth)
      connection.start().then(function () {
        console.log("conexion exitosa")
      }).catch(function (err) {
        return console.error(err.toString());
      });
      setConnection(connection)


    }

  }, [isMe])
  useEffect(() => {
    const getChats = async (e) => {

      try {
        const res = await crudAxios.get("/message", config)

        setIsOwner(res.data.response.isOwner)
        setUsuarios(res.data.response.mensajes)


      } catch (error) {
        console.log(error)
      }
    }
    getChats()
  }, [])

  useEffect(() => {
    const chat = usuarios.filter(usuario => usuario.usuarioId == roomChat)

    setChats(chat)
    if (connection != null) {

      connection.on("ReceiveMessage", function (sender, message) {
        if (sender == roomChat) {
          console.log({sender,roomChat})
          console.log(sender == roomChat)

          setChat({
            propietarioId: '0',
            image: userImage,
            message: message
          })
        }
      })
    }

  }, [roomChat])

  useEffect(() => {
    setChats([...chats, chat])
  }, [chat])

  return (
    <div className="flex h-screen antialiased text-gray-800 p-4">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <SideBarProfile usuarios={usuarios} roomChats={[roomChat, setRoomChat]} setIsMe={setIsMe} config={config} setIsMyImage={setIsMyImage} setUserImage={setUserImage} />
        <div className="flex flex-col flex-auto h-full p-6">
          {
            (connection != null && roomChat.length > 0) && (

              <LayoutChatComponent Chat={[chats, setChats]} isMyImage={isMyImage} roomChat={roomChat} connection={connection} isOwner={isOwner} isMe={isMe} />
            )
          }
        </div>
      </div>
    </div>
  )
}
