import { create } from 'zustand'
 

export const useGetHeader = create(
    (set,get) =>({
        config : {},
        setConfig: (config = {})=>{
            set({config:config})
        }
    }),{
        name:"get-header"
    }
)
