import { create } from 'zustand'
 

export const useGetCategories = create(
    (set,get) =>({
        categories:[],
        setCategories: (categories = [])=>{


            set({categories:categories})
           
 
        } 
    }),{
        name:"get-categories"
    }
)