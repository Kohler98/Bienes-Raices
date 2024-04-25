import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CRMContext } from '../context';
import { NotificationsItems } from './Notifications';
import image from '/public/profile/profile.jpg'
export const AuthNavBar = ({ usuario = {} }) => {
    const [auth, setAuth, userRole] = useContext(CRMContext);
    const [showMenu, setShowMenu] = useState(false)
    const [showNotification, setShowNotification] = useState(false)
    const menuRef = useRef(null);
    const hanldeShowNotifications = () =>{
        setShowNotification(!showNotification)
        setShowMenu(false)
    }
    const handleShowMenu = (e) => {
        setShowMenu(!showMenu)
        setShowNotification(false)
    }
    const logout = (e) => {

        setAuth({
            token: "",
            isAuthenticated: false,
            userRole: ""
        })
        localStorage.removeItem("token");
        setShowMenu(!showMenu)
    }
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowMenu(false);
            setShowNotification(false)
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">

                <button type="button" onClick={hanldeShowNotifications} className="relative rounded-full bg-indigo-600  p-1 text-white hover:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-800" id="user-notification-button" aria-expanded="false" aria-haspopup="true">
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">View notifications</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                </button>
            <div ref={menuRef} className={`absolute ${showNotification ? 'block' : 'hidden'} fade-in right-0 z-10 mt-2 h-72 overflow-y-scroll w-60 origin-top-right rounded-md bg-indigo-100 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="user-notification-button" tabIndex="-1">
                <NotificationsItems  classname={'w-full px-2 pb-8 mt-4 sm:max-w-xl sm:rounded-lg'}/>
            </div>
            </div>

            <div className="relative ml-3">
                <div>
                    <button type="button" onClick={handleShowMenu} className="relative flex rounded-full bg-indigo-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                        <span className="absolute -inset-1.5"></span>
                        <span className="sr-only">Open user menu</span>
                        <img className="h-8 w-8 rounded-full" src={usuario.imagen.length > 0 ? usuario.imagen : image} alt="" />
                    </button>
                </div>


                <div ref={menuRef} className={`absolute ${showMenu ? 'block' : 'hidden'} fade-in right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">

                    <Link to="/administracion" onClick={() => setShowMenu(!showMenu)} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Administracion</Link>
                    <Link to="/profile" onClick={() => setShowMenu(!showMenu)} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Perfil</Link>
                    <Link to="/message" onClick={() => setShowMenu(!showMenu)} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Mensajes</Link>
                    <button type='button' onClick={logout} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign Out</button>
                </div>
            </div>
        </div>
    )
}
