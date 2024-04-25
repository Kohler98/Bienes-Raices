import React, {  useEffect, useState } from 'react'
import { SendChatComponent } from './SendChatComponent'
import { ReceiveChatComponent } from './ReceiveChatComponent'
import * as signalR from "@microsoft/signalr";
 
import { useForm } from '../../../hooks';

export const LayoutChatComponent = ({ roomChat='', Chat = [], isMyImage, connection, isOwner = false,isMe=''}) => {

    const [chats,setChats] = Chat
    const [chat, setChat] = useState({})
 
    
    const { formState, onInputChange, setState, onResetForm } = useForm({
        message: '' 
    })
 
 
    const handleSendMessage = (e)=>{
        e.preventDefault()
 
        setChat({
            propietarioId:isMe,
    
            image:isMyImage,
            message:formState.message,
            isOwner:!isOwner
        })
        connection.invoke("SendMessageToPerson", roomChat, formState.message).catch(function (err) {
            return console.error(err.toString());
        });
        onResetForm()
    }
    useEffect(()=>{
        setChats([...chats,chat])
    },[chat])
    return (
        <div
            className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4"
        >
            <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                    <div className="grid grid-cols-12 gap-y-2">



                        {
                        chats.length > 0 && ( chats.map((mensaje,index)=>(
                            (mensaje.propietarioId == isMe && index > 0) ?
                            <SendChatComponent key={`${mensaje.roomChat}-${index}`} mensaje={mensaje} isMyImage={isMyImage}/>
                            :
                            <ReceiveChatComponent key={`${mensaje.roomChat}-${index}`} mensaje={mensaje}/>
                        )))
                    }


                    </div>
                </div>
            </div>
            <div
                className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
            >
                <div>
                    <button
                        className="flex items-center justify-center text-gray-400 hover:text-gray-600"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                            ></path>
                        </svg>
                    </button>
                </div>
                <div className="flex-grow ml-4">
                    <div className="relative w-full">
                        <input
                        name='message'
                        onChange={onInputChange}
                        value={formState.message}
                            type="text"
                            className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                        />
                        <button
                            className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="ml-4">
                    <button
                    onClick={handleSendMessage}

                        className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                    >
                        <span>Send</span>
                        <span className="ml-2">
                            <svg
                                className="w-4 h-4 transform rotate-45 -mt-px"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                ></path>
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}
