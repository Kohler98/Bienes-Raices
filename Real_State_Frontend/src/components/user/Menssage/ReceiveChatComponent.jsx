import React from 'react'
import image from '/public/profile/profile.jpg'
export const ReceiveChatComponent = ({ mensaje }) => {
 
    return (

        <div className="col-start-1 col-end-8 p-3 rounded-lg">
            <div className="flex flex-row items-center">
                <div
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                >
                    <img
                        src={mensaje.image ? mensaje.image : image}
                        alt="Avatar"
                        className="h-full w-full rounded-full"
                    />
                </div>
                <div
                    className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                >
                    <div>{mensaje.message}</div>
                </div>
            </div>
        </div>
    )
}
