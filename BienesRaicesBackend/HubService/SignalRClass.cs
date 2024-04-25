using BienesRaicesBackend.Models;
using BienesRaicesBackend.Models.Custom;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Reflection.Metadata;
using System;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using Microsoft.AspNetCore.Authentication.JwtBearer;


namespace BienesRaicesBackend.HubService
{
 
    public sealed class SignalRClass : Hub
    {
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public override Task OnConnectedAsync()
        {
            HttpContext httpContext = Context.GetHttpContext();

            string receiver = httpContext.Request.Query["userid"];
  
            string sender = Context.User.Claims.FirstOrDefault().Value;

            Groups.AddToGroupAsync(Context.ConnectionId, sender);
            if (!string.IsNullOrEmpty(receiver))
            {
                Groups.AddToGroupAsync(Context.ConnectionId, receiver);
            }
            return base.OnConnectedAsync();

        }

        public Task SendMessageToPerson(string receiver, string message)
        {
            var senderId = Context.UserIdentifier;
 
            return Clients.Group(receiver).SendAsync("ReceiveMessage", senderId, message);
        }
    }
}
 