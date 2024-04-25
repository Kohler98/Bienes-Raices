import { useEffect, useState } from "react"

 

export const useFetch = (url,info,token='',action = 'GET') => {
    //creamos el state inicial donde data sera el url, isloading servira para verificar si se completo o no la peticion a la api
    //y has error sirver para verificar si hay un error o no
    const [state, setState] = useState({
        data:null,
        isLoading:true,
        hasError:null
    })
    let requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json','x-token':token }
      };
    const [method,setMethod] = useState(requestOptions)



    const getFetch = async() =>{
        //se barre el state primero por si hay mas informacion ants de la actual
 
        switch(action){
            case 'PUT':
                requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json','x-token':token },
                    body: JSON.stringify(info) // aquí debes proporcionar los datos que deseas enviar en la solicitud UPDATE
                    };
                setMethod(requestOptions)
            break
            case 'POST':
                requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json','x-token':token },
                    body: JSON.stringify(info) // aquí debes proporcionar los datos que deseas enviar en la solicitud POST
                };
                setMethod(requestOptions)
            break
            case 'DELETE':
                requestOptions = {
                    headers: { 'Content-Type': 'application/json','x-token':token },
                    method: 'DELETE'
                };
                setMethod(requestOptions)
            break
            default:
            break
        }
        setState({
            ...state,
            isLoading:true
        })
        //se hace la peticio http con fetch
        const resp = await fetch(url,method)
        //se convierte la respuesta en un json
        const data = await resp.json()
 
 
        //se setea el state nueva mente con la peticion ya realizada y se cambia el isLoading a false por que ya hay una respuesta
        setState({
            data:data,
            isLoading:false,
            hasError:null
        })
    }
    
    //el useEffect se utiliza para verificar si hay un cambio en el state si lo hay se reenderiza y se hace de nuevo la peticion http con getFetch
    useEffect(()=>{
        getFetch()
     
    },[url])

  return {
    data:state.data,
    isLoading:state.isLoading,
    hasError:state.hasError
  }
}