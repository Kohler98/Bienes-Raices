import React from 'react'

export const NotificationsItems = ({classname = ''}) => {
    return (
        <div className={classname}>
            <div className="flex items-center justify-between">
                <p tabIndex="0" className="focus:outline-none text-2xl font-semibold leading-6 text-gray-800">Notifications</p>

            </div>

            <div className="w-full p-3 mt-8 bg-white rounded flex">
                <div tabIndex="0" aria-label="heart icon" role="img" className="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.00059 3.01934C9.56659 1.61334 11.9866 1.66 13.4953 3.17134C15.0033 4.68334 15.0553 7.09133 13.6526 8.662L7.99926 14.3233L2.34726 8.662C0.944589 7.09133 0.997256 4.67934 2.50459 3.17134C4.01459 1.662 6.42992 1.61134 8.00059 3.01934Z" fill="#EF4444" />
                    </svg>
                </div>
                <div className="pl-3">
                    <p tabIndex="0" className="focus:outline-none text-sm leading-none"><span className="text-indigo-700">James Doe</span> favourited an <span className="text-indigo-700">property</span></p>
                    <p tabIndex="0" className="focus:outline-none text-xs leading-3 pt-1 text-gray-500">2 hours ago</p>
                </div>
            </div>

            <div className="w-full p-3 mt-4 bg-white rounded flex">
                <div tabIndex="0" aria-label="post icon" role="img" className="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.30325 12.6667L1.33325 15V2.66667C1.33325 2.48986 1.40349 2.32029 1.52851 2.19526C1.65354 2.07024 1.82311 2 1.99992 2H13.9999C14.1767 2 14.3463 2.07024 14.4713 2.19526C14.5963 2.32029 14.6666 2.48986 14.6666 2.66667V12C14.6666 12.1768 14.5963 12.3464 14.4713 12.4714C14.3463 12.5964 14.1767 12.6667 13.9999 12.6667H4.30325ZM5.33325 6.66667V8H10.6666V6.66667H5.33325Z" fill="#4338CA" />
                    </svg>
                </div>
                <div className="pl-3">
                    <p tabIndex="0" className="focus:outline-none text-sm leading-none"><span className="text-indigo-700">Sarah</span>  send you a message: <span className="text-indigo-700">Update gone wrong</span></p>
                    <p tabIndex="0" className="focus:outline-none text-xs leading-3 pt-1 text-gray-500">2 hours ago</p>
                </div>
            </div>


            <h2 tabIndex="0" className="focus:outline-none text-sm leading-normal pt-8 border-b pb-2 border-gray-300 text-gray-600">YESTERDAY</h2>
            <div className="w-full p-3 mt-6 bg-white rounded flex">
                <div tabIndex="0" aria-label="post icon" role="img" className="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.30325 12.6667L1.33325 15V2.66667C1.33325 2.48986 1.40349 2.32029 1.52851 2.19526C1.65354 2.07024 1.82311 2 1.99992 2H13.9999C14.1767 2 14.3463 2.07024 14.4713 2.19526C14.5963 2.32029 14.6666 2.48986 14.6666 2.66667V12C14.6666 12.1768 14.5963 12.3464 14.4713 12.4714C14.3463 12.5964 14.1767 12.6667 13.9999 12.6667H4.30325ZM5.33325 6.66667V8H10.6666V6.66667H5.33325Z" fill="#4338CA" />
                    </svg>
                </div>
                <div className="pl-3">
                    <p tabIndex="0" className="focus:outline-none text-sm leading-none"><span className="text-indigo-700">Sarah</span> send you a message: <span className="text-indigo-700">Update gone wrong</span></p>
                    <p tabIndex="0" className="focus:outline-none text-xs leading-3 pt-1 text-gray-500">2 hours ago</p>
                </div>
            </div>

            <div className="w-full p-3 mt-4 bg-white rounded flex">
                <div tabIndex="0" aria-label="heart icon" role="img" className="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.00059 3.01934C9.56659 1.61334 11.9866 1.66 13.4953 3.17134C15.0033 4.68334 15.0553 7.09133 13.6526 8.662L7.99926 14.3233L2.34726 8.662C0.944589 7.09133 0.997256 4.67934 2.50459 3.17134C4.01459 1.662 6.42992 1.61134 8.00059 3.01934Z" fill="#EF4444" />
                    </svg>
                </div>
                <div className="pl-3">
                    <p tabIndex="0" className="focus:outline-none text-sm leading-none"><span className="text-indigo-700">James Doe</span> favourited an <span className="text-indigo-700">property</span></p>
                    <p tabIndex="0" className="focus:outline-none text-xs leading-3 pt-1 text-gray-500">2 hours ago</p>
                </div>
            </div>

            <div className="flex items-center justiyf-between">
                <hr className="w-full" />
                <p tabIndex="0" className="focus:outline-none text-sm flex flex-shrink-0 leading-normal px-3 py-16 text-gray-500">Thats it for now :)</p>
                <hr className="w-full" />
            </div>
        </div>
    )
}
