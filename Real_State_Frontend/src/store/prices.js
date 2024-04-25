import { create } from 'zustand'
 

export const useGetPrices = create(
    (set,get) =>({
        prices:[],
        setPrices: (prices = [])=>{


            set({prices:prices})
           
 
        } 
    }),{
        name:"get-prices"
    }
)