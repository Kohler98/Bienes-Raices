 
using BienesRaicesBackend.Models.Custom;
using BienesRaicesBackend.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Security.Claims;

namespace BienesRaicesBackend.Services.Repositories
{
    public class MessageRepository : IGenericRepository<MessageResponse>
    {
        private readonly string _cadenaSql = "";
        private readonly IHttpContextAccessor _httpContextAccessor;
        public MessageRepository(IConfiguration configuracion, IHttpContextAccessor httpContextAccessor)
        {
            _cadenaSql = configuracion.GetConnectionString("cadenaSQL");
            _httpContextAccessor = httpContextAccessor;
        }
        [Authorize]
        public async Task<List<MessageResponse>> GetMany()
        {
            if (_httpContextAccessor.HttpContext?.User == null)
            {
                // Handle the case where there's no current user (optional)
                throw new UnauthorizedAccessException("No user found in current context.");
            }
            var claimsPrincipal = _httpContextAccessor.HttpContext?.User;
            var id = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
            Guid userId = Guid.Parse(id);

            List<MessageResponse> _lista = new List<MessageResponse>();
            using (var conexion = new SqlConnection(_cadenaSql))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("sp_MisMensajes", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("usuarioId", userId);
                using (var dr = await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {

                        _lista.Add(new MessageResponse
                        {
                            Message = (string)dr["mensaje"],
                            usuarioNombre = (string)dr["nombre"],
                            usuarioApellido = (string)dr["apellido"],
                            Image = (string)dr["imagen"],
                            propietarioId = (Guid)dr["propietarioId"],
                            usuarioId = (Guid)dr["usuarioId"],
                            isOwner = (bool)dr["isOwner"]

                        });
                    }
                }
            }
            return _lista;
        }
        public Task<bool> Delete(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Edit(MessageResponse modelo)
        {
            throw new NotImplementedException();
        }


        public Task<MessageResponse> GetOne(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<MessageResponse> Save(MessageResponse modelo)
        {
            MessageResponse message = new MessageResponse();
            using (var conexion = new SqlConnection(_cadenaSql))
            {
 
                conexion.Open();
                SqlCommand cmd = new SqlCommand("sp_MandarMensaje", conexion);
                // @nombre, @apellido, @email, @hashedPassword, @imagen, @activo, @token
                cmd.Parameters.AddWithValue("usuarioId", modelo.usuarioId);
                cmd.Parameters.AddWithValue("propiedadId", modelo.propiedadId);
                cmd.Parameters.AddWithValue("contenido", modelo.Message);
   
                cmd.CommandType = CommandType.StoredProcedure;



                using (var dr = await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {
                        message.usuarioId = (Guid)dr["usuarioId"];
                        message.propietarioId = (Guid)dr["propietarioId"];
 
 
                        message.usuarioNombre= dr["nombre"].ToString() ?? " ";
                        message.usuarioApellido = dr["apellido"].ToString() ?? " ";
 

                    }
                }
                return message;
            }
        }
    }
}
