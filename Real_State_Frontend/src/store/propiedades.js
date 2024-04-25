import { create } from 'zustand'
 

export const usePropiedades = create(

    (set,get) =>({
        propiedad:{
            id:'',
            titulo:'',
            descripcion:'',
            category:'',
            precio:'',
            habitaciones:'',
            estacionamiento:'',
            wc:'',
            lat:'',
            lng:'',
            imagen:'',
            city:'',
            country:'',
            road:'',
            state:''  
        },
        misPropiedades:[],
        propiedades:[],
        setPropiedades: (propiedades = []) =>{
            set({propiedades:propiedades})
        },
        setMisPropiedades: (propiedades = []) =>{
            set({misPropiedades:propiedades})
        },
        setPropiedad: (propiedad = {})=>{


            set({propiedad:propiedad})
           
 
        },
        onInputChange: (e)=>{
           
            const {propiedad} = get()
            set({propiedad:{
                ...propiedad,
                [e.target.name]: e.target.value,}
            })
        
        } ,
        onResetForm: () =>{
            const propiedad = {
                id:'',
                titulo:'',
                descripcion:'',
                category:'',
                precio:'',
                habitaciones:'',
                estacionamiento:'',
                wc:'',
                lat:'',
                lng:'',
                imagen:'',
                city:'',
                country:'',
                road:'',
                state:''  
            }
            set({propiedad: propiedad})
        }
    }),{
        name:"get-propiedades"
    }
)