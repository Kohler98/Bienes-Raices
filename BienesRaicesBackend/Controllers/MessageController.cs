using BienesRaicesBackend.Models;
using BienesRaicesBackend.Models.Custom;
using BienesRaicesBackend.Services.Contracts;
using BienesRaicesBackend.HubService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace BienesRaicesBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        public readonly DbBienesRaicesContext _dbcontext;
        private IHubContext<SignalRClass> _signalContext;
        private IGenericRepository<MessageResponse> _messageResponse;
        public MessageController(DbBienesRaicesContext dbcontext, IGenericRepository<MessageResponse> messageResponse, IHubContext<SignalRClass> signalContext)
        {
            _dbcontext = dbcontext;
            _messageResponse = messageResponse;
            _signalContext = signalContext;
        }
        [Authorize]
        [HttpPost]
        public async  Task<ActionResult> SendMessageToChat(MessageRequest message) 
        {
            try
            {
                var claimsPrincipal = HttpContext.User;
                var id = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
                Guid userId = Guid.Parse(id);
                MessageResponse messageResponse = new MessageResponse();

                messageResponse.usuarioId = userId;
                messageResponse.propiedadId = message.propiedadId;
                messageResponse.Message = message.Message;

                MessageResponse respuesta = await _messageResponse.Save(messageResponse);
 

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = respuesta });
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status404NotFound, new { mensaje = ex.Message, response = "hubo un Error" });
            }

        }
        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetAllChat()
        {
            try
            {
 
                List<MessageResponse> respuesta = await _messageResponse.GetMany();
                bool isOwner = false;

                foreach(var respuestaItem in respuesta)
                {
                    isOwner = respuestaItem.isOwner;
                    break;
                }
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = new { mensajes = respuesta, isOwner = isOwner } });

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status404NotFound, new { mensaje = ex.Message, response = "hubo un Error" });
            }
        }
    }
}
