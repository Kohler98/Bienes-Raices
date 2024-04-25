import React, { useContext } from 'react'
import { CRMContext } from '../../context';

export const AccountSettings = () => {
    const [auth, setAuth] = useContext(CRMContext);
    
    const logout = () => {
        setAuth({
            token: "",
            isAuthenticated: false,
            userRole: ""
        })
        localStorage.removeItem("token");
    }
    return (
        <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">

            <div className="flex flex-col space-y-5 sm:ml-8">

                <button type="button"

                    className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-red- rounded-lg border border-indigo-200 hover:bg-red-300 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                    Delete account
                </button>
                <button type="button"
                onClick={logout}
                    className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-red- rounded-lg border border-indigo-200 hover:bg-yellow-300 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                    Log out
                </button>
            </div>

        </div>
    )
}
