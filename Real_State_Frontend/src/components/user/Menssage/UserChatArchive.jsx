import React from 'react'
import image from '/public/profile/profile.jpg'
export const UserChatArchive = ({ usuario, roomChats,setUserImage }) => {
    const [roomChat, setRoomChat] = roomChats
 
    return (
        <button
            onClick={() => {
                setRoomChat(`${usuario.usuarioId}`)
                setUserImage(usuario.image ? usuario.image : image)
            }}
            className={`flex flex-row ${roomChat == `${usuario.usuarioId}`? 'bg-gray-300' : 'hover:bg-gray-100'} items-center  rounded-xl p-2`}
        >
            <div
                className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
            >
                <img
                    src={usuario.image ? usuario.image : image}
                    alt="Avatar"
                    className="h-full w-full rounded-full"
                />

            </div>
            <div className="ml-2 text-sm font-semibold">{usuario.usuarioNombre} {usuario.usuarioApellido}</div>
        </button>
    )
}
