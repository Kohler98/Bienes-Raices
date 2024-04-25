import React from 'react'
import { SideBarItem } from './SideBarItem'
import { useNavigate } from 'react-router'
import Previous from '../../shared/Previous'

export const SideBarProfile = ({ menuItems, select }) => {
    const [selected, setSelected] = select
    const navigate = useNavigate()
    const onHandleGoBack = () => {
        navigate('/administracion')
    }
    return (
        <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
            <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
                <div className="flex flex-row items-center mb-4  space-x-1 justify-start h-12 w-full">

                    <div
                        onClick={onHandleGoBack}
                        className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10"
                    >


                        <Previous />

                    </div>
                    <h2 className="pl-2 text-2xl font-semibold">Settings</h2>
                </div>
                {
                    menuItems.map((item) => (
                        <SideBarItem key={item.selected} item={item} selected={selected} setSelected={setSelected} />
                    ))
                }

            </div>
        </aside>
    )
}
