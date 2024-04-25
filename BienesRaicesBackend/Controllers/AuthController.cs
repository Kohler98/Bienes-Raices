 
using BienesRaicesBackend.Middleware;
using BienesRaicesBackend.Models;
using BienesRaicesBackend.Models.Custom;
using BienesRaicesBackend.Services.Contracts;
using System.Net.Mail;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using BienesRaicesBackend.Services.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BienesRaicesBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public readonly DbBienesRaicesContext _dbcontext;
        private readonly IGenericAuthRepository<Usuario> _userRepository;
        private readonly IJwtServiceRepository _jwtSevice;
        private readonly IAlmacenarArchivos _almacenarArchivos;
        public AuthController(IGenericAuthRepository<Usuario> userRepository, IJwtServiceRepository jwtService, DbBienesRaicesContext dbcontext, IAlmacenarArchivos almacenarArchivos)
        {
            _userRepository = userRepository;
            _dbcontext = dbcontext;
            _jwtSevice = jwtService;
            _almacenarArchivos = almacenarArchivos;
        }
        // GET api/<AuthController>/5

        [HttpGet]
        [Route("users/{id}")]
        public async Task<IActionResult> GetUser(Guid id)
        {
            try
            {
                Usuario user = await _userRepository.GetOne(id);
                AuthRegisterResponse usuario = new AuthRegisterResponse
                {
                    Id = user.Id,
                    Nombre = user.Nombre,
                    Apellido = user.Apellido,
                    Email = user.Email,
                    Imagen = user.Url,
                    Activo = (bool)user.Activo,
                    Token = user.Token,
                };
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = user });
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status404NotFound, new { mensaje = ex.Message, response = "hubo un Error" });

            }
        }

        // POST api/<AuthController>
        [HttpPost]
        [Route("signup")]
        public async Task<IActionResult> RegistrarUsuario([FromBody] AuthRegisterResponse usuario)
        {
            try
            {

                string referer = Request.Headers["Referer"].ToString();
 
                Usuario user = await _userRepository.Save(usuario);
                string token = user.Token;
                string authUrl = Helpers.Helpers.GetUrl(referer, token, "confirmar_cuenta");

                var resp = _almacenarArchivos.SendMail(user.Email, "Bienvenido a BienesRaices.com", "confirmar-cuenta.html", authUrl, $"{user.Nombre} {user.Apellido}");

                if (resp)
                {
                         return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = "Se ha enviado un correo electronico para confirmacion de su cuenta" });

                }
                else { 

                    await _userRepository.Delete(user.Id);
                    return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = "error al enviar correo" });

                }
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status404NotFound, new { mensaje = ex.Message, response = "hubo un Error" });

            }
        }
        // POST api/<AuthController>
        [HttpPost]
        [Route("signin")]
        public async Task<IActionResult> IniciarSesion([FromBody] AuthorizationRequest usuario)
        {
            try
            {


                Guid id = await _userRepository.Login(usuario);
                AuthorizationResponse jwt = await _jwtSevice.ReturnJWT(id);
                return StatusCode(StatusCodes.Status200OK, jwt);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status404NotFound, new { mensaje = ex.Message, response = "hubo un Error" });

            }
        }

        // PUT api/<AuthController>/5
        [Authorize]
        [HttpPut]
        [Route("edit/{id:guid}")]
        public async Task<IActionResult> EditarUsuario([FromForm] AuthRegisterRequest usuario, Guid id)
        {
            try
            {
                Usuario user = await _userRepository.GetOne(id);
                user.Nombre = usuario.Nombre ?? "";
                user.Apellido = usuario.Apellido ?? "";
                user.Password = usuario.Password ?? "";
                user.Email = usuario.Email ?? "";

                if (usuario.Imagen != null && usuario.Imagen.Length > 0)
                {
                    if (user.Url.Length > 0)
                    {
                        string url = Helpers.Helpers.GetImage(user.Url);
                        await _almacenarArchivos.Borrar(url, "imagenes");
                    }
                    var imagen = usuario.Imagen;
                    using var stream = new MemoryStream();

                    await imagen.CopyToAsync(stream);
                    var fileByte = stream.ToArray();
 
                    user.Imagen = fileByte;
                    string imagenUrl = await _almacenarArchivos.Crear(fileByte, imagen.ContentType, Path.GetExtension(imagen.FileName), "imagenes", Guid.NewGuid().ToString());
                    user.Url = imagenUrl;
                }
                bool editado = await _userRepository.Edit(user, id);

                if (editado)
                {
                    return StatusCode(StatusCodes.Status200OK, new
                    {
                        mensaje = "ok",
                        response = "usuario editado con exito"
                    });
                }
                else
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new
                    {
                        mensaje = "error",
                        response = "Error al editar usuario"
                    });
                }

            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status404NotFound, new { mensaje = ex.Message, response = "hubo un Error" });

            }
        }
        [HttpGet]
        [Route("confirmar_cuenta/{token}")]
        public async Task<IActionResult> ConfirmarCuenta(String token)
        {

            try
            {
                bool editado = await _userRepository.ConfirmAccount(token);


                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = "Su cuenta esta confirmada" });
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status404NotFound, new { mensaje = ex.Message, response = "hubo un Error" });

            }
        }
        // DELETE api/<AuthController>/5
        [Authorize]
        [HttpDelete]
        [Route("users/{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            try
            {
                bool borrar = await _userRepository.Delete(id);


                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = "Se ha eliminado al usuario con exito" });
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status404NotFound, new { mensaje = ex.Message, response = "hubo un Error" });

            }
        }
        // POST api/<AuthController>
        [HttpPost]
        [Route("forgot_password")]
        public async Task<IActionResult> OlvidePassword([FromBody] RecoverRequest usuario)
        {
            try
            {
                Usuario user = await _userRepository.ForgotPassword(usuario.Email);
                string token = user.Token;
                string referer = Request.Headers["Referer"].ToString();
                string authUrl = Helpers.Helpers.GetUrl(referer, token, "reset_password");

                var resp = _almacenarArchivos.SendMail(user.Email, "Bienvenido a BienesRaices.com", "recuperar-password.html", authUrl, $"{user.Nombre} {user.Apellido}");


                if (resp)
                {
                    return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = "Se ha enviado un correo electronico para recuperar la contraseña" });

                }
                else
                {
 
                    return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = "error al enviar correo" });

                }
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status404NotFound, new { mensaje = ex.Message, response = "hubo un Error" });

            }
        }
        // POST api/<AuthController>
        [HttpPost]
        [Route("recover_password/{token}")]
        public async Task<IActionResult> RecuperarPassword([FromBody] Usuario usuario, String token)
        {
            try
            {

                usuario.Token = token;
                bool recover = await _userRepository.RecoverPassword(usuario);


                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = "Se ha recuperado su contraseña con exito" });
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status404NotFound, new { mensaje = ex.Message, response = "hubo un Error" });

            }
        }
 
        [HttpGet]
 
        [Route("users")]
        public async Task<IActionResult> GetUsers()
        {

            try
            {
 
                List<Usuario> _lista = await _userRepository.GetMany();
                List<AuthRegisterResponse> usuarios = new List<AuthRegisterResponse>();

                foreach (var usuario in _lista)
                {
                    var user = new AuthRegisterResponse
                    {
                        Id = usuario.Id,
                        Nombre = usuario.Nombre,
                        Apellido = usuario.Apellido,
                        Email = usuario.Email,
                        Imagen = usuario.Url 
                    };

                    usuarios.Add(user);
                }

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = usuarios });
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status404NotFound, new { mensaje = ex.Message, response = "hubo un Error" });

            }
        }
        [Authorize]
        [HttpGet]
        [Route("me")]
        public async Task<IActionResult> GetUserProfile()
        {

            try
            {
                var claimsPrincipal = HttpContext.User;
                var id = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
                Guid userId = Guid.Parse(id);
                Usuario user = await _userRepository.GetOne(userId);



                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = user });
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status404NotFound, new { mensaje = ex.Message, response = "hubo un Error" });

            }
        }
    }
}
