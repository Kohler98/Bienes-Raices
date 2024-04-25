import React from 'react'
import { Link } from 'react-router-dom'
export const SideBarItem = ({item, selected = 1, setSelected}) => {
    // 
    return (
        <>
 
        <button 
            onClick={()=>setSelected(item.selected)}
            className={`flex items-center px-3 py-2.5 ${selected == item.selected ? 'bg-white  text-indigo-900 border font-bold rounded-full' : 'hover:text-indigo-900 hover:border hover:rounded-full'}  `}>
            {item.title}
        </button>
 
        </>
    )
}
