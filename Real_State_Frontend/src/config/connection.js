import * as signalR from "@microsoft/signalr";
export const getConnection = (isMe = '', auth = {}) =>{
    let connection = new signalR.HubConnectionBuilder().withUrl(`${import.meta.env.VITE_APP_BACKEND_URL}/websocket?userid=${isMe}`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => auth.token
      })
      .build()
    
    return connection
}