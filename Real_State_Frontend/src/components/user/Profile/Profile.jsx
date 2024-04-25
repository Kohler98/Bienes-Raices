import React, { useContext, useEffect, useState } from 'react'
 
import { EditProfile } from './EditProfile'
import { SideBarProfile } from './SideBarProfile'
import { AccountSettings } from './AccountSettings'
import { Notifications } from './Notifications'
import { CRMContext } from '../../context'
import { useNavigate } from 'react-router'
const menuItems = [
  {

    title:'Public profile',
    selected:1,
  },
  {

    title:'Account Settings',
    selected:2,
  },
  {

    title:'Notificactions',
    selected:3,
  },
]
export const Profile = () => {
    const [selected, setSelected] = useState(1)
    const navigate = useNavigate()
    const [auth, setAuth] = useContext(CRMContext);
  
    useEffect(() => {
      if (!auth.isAuthenticated) {
        navigate("/")
      }
    }, [auth])
    return (
        <div className="bg-white w-full flex flex-col gap-5 p-4 md:px-16 lg:px-28 md:flex-row text-[#161931]">
            <SideBarProfile menuItems={menuItems} select={[selected, setSelected]}/>
            <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
                <div className="p-2 md:p-4">
                  {
                    selected == 1 && (
                      <EditProfile/>

                    )
                  }
                  {
                    selected == 2 && (
                      <AccountSettings/>
                    )
                  }
                  {
                    selected == 3 && (
                      <Notifications/>
                    )
                  }
                </div>
            </main>
        </div>
    )
}
