using BienesRaicesBackend.Models.Custom;
using BienesRaicesBackend.Models;
using BienesRaicesBackend.Services.Contracts;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Data;
using static System.Net.Mime.MediaTypeNames;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace BienesRaicesBackend.Services.Repositories
{
    public class UsuarioRepository : IGenericAuthRepository<Usuario>
    {
        private readonly string _cadenaSql = "";

        public UsuarioRepository(IConfiguration configuracion)
        {
            _cadenaSql = configuracion.GetConnectionString("cadenaSQL");
        }
        public async Task<Guid> Login(AuthorizationRequest modelo)
        {
            Guid id = new Guid();
            using (var conexion = new SqlConnection(_cadenaSql))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("sp_IniciarSesion", conexion);
                // @nombre, @apellido, @email, @hashedPassword, @imagen, @activo, @token

                cmd.Parameters.AddWithValue("email", modelo.Email);
                cmd.Parameters.AddWithValue("password", modelo.Password);

                cmd.CommandType = CommandType.StoredProcedure;


                using (var dr = await cmd.ExecuteReaderAsync())
                {
                
                    while (await dr.ReadAsync())
                    {
                        id = (Guid)dr["id"];
                    }
                }
                return id;
            }
        }
        public async Task<bool> Delete(Guid id)
        {
            using (var conexion = new SqlConnection(_cadenaSql))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("sp_EliminarUsuario", conexion);
                cmd.Parameters.AddWithValue("id", id);


                cmd.CommandType = CommandType.StoredProcedure;

                int filas_afectados = await cmd.ExecuteNonQueryAsync();
                if (filas_afectados > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        public async Task<bool> Edit(Usuario modelo, Guid id)
        {
            using (var conexion = new SqlConnection(_cadenaSql))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("sp_EditarUsuario", conexion);
                cmd.Parameters.AddWithValue("id", id);
                cmd.Parameters.AddWithValue("nombre", modelo.Nombre);
                cmd.Parameters.AddWithValue("apellido", modelo.Apellido);
                cmd.Parameters.AddWithValue("email", modelo.Email);
                cmd.Parameters.AddWithValue("password", modelo.Password);
                if (modelo.Imagen != null && modelo.Imagen.Length > 0)
                {
                    cmd.Parameters.AddWithValue("imagen", modelo.Imagen);
                    cmd.Parameters.AddWithValue("url", modelo.Url);
                }
                    cmd.CommandType = CommandType.StoredProcedure;

                int filas_afectados = await cmd.ExecuteNonQueryAsync();
                if (filas_afectados > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }

            }
        }

        public async Task<List<Usuario>> GetMany()
        {
            List<Usuario> _lista = new List<Usuario>();

            using (var conexion = new SqlConnection(_cadenaSql))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("sp_ListaUsuarios", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                using (var dr = await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {
                        _lista.Add(new Usuario
                        {
                            Id = (Guid)dr["id"],
                            Nombre = dr["nombre"].ToString(),
                            Apellido = dr["apellido"].ToString(),
                            Email = dr["email"].ToString(),
                            Url = dr["url"].ToString(),
                        });;
                    }
                }
            }
            return _lista;
        }

        public async Task<Usuario> GetOne(Guid id)
        {
            Usuario usuario = new Usuario();
            using (var conexion = new SqlConnection(_cadenaSql))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("sp_GetUsuario", conexion);
                // @nombre, @apellido, @email, @hashedPassword, @imagen, @activo, @token
                cmd.Parameters.AddWithValue("id", id);



                cmd.CommandType = CommandType.StoredProcedure;



                using (var dr = await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {
                        usuario.Id = (Guid)dr["id"];
                        usuario.Nombre = dr["nombre"].ToString();
                        usuario.Apellido = dr["apellido"].ToString();
                        usuario.Email = dr["email"].ToString();
                        usuario.Url =dr["url"].ToString();
                    }
                }
                return usuario;
            }
        }

        public async Task<Usuario> Save(AuthRegisterResponse modelo)
        {
            Usuario usuario = new Usuario();
            using (var conexion = new SqlConnection(_cadenaSql))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("sp_RegistrarUsuario", conexion);
                // @nombre, @apellido, @email, @hashedPassword, @imagen, @activo, @token
                cmd.Parameters.AddWithValue("nombre", modelo.Nombre);
                cmd.Parameters.AddWithValue("apellido", modelo.Apellido);
                cmd.Parameters.AddWithValue("email", modelo.Email);
                cmd.Parameters.AddWithValue("password", modelo.Password);
 


                cmd.CommandType = CommandType.StoredProcedure;



                using (var dr = await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {
                        usuario.Token = dr["token"].ToString();
                        usuario.Nombre = dr["nombre"].ToString();
                        usuario.Apellido = dr["apellido"].ToString();
                        usuario.Email = dr["email"].ToString();
                        usuario.Id = (Guid)dr["id"];
                    }
                }
                return usuario;
            }
        }
        public async Task<bool> ConfirmAccount(string token)
        {
            using (var conexion = new SqlConnection(_cadenaSql))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("sp_VerificarCuenta", conexion);
                cmd.Parameters.AddWithValue("token", token);
 
                cmd.CommandType = CommandType.StoredProcedure;

                int filas_afectados = await cmd.ExecuteNonQueryAsync();
                if (filas_afectados > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }

            }
        }

        public async Task<Usuario> ForgotPassword(string email)
        {
            using (var conexion = new SqlConnection(_cadenaSql))
            {
                Usuario usuario = new Usuario();
                conexion.Open();
                SqlCommand cmd = new SqlCommand("sp_ForgotPassword", conexion);
                cmd.Parameters.AddWithValue("email", email);

                cmd.CommandType = CommandType.StoredProcedure;


                using (var dr = await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {
                        usuario.Nombre = (string?)dr["nombre"];
                        usuario.Apellido = (string?)dr["apellido"];
                        usuario.Email = (string?)dr["email"];
                        usuario.Token = (string?)dr["token"];


                    }
                }
                return usuario;

            }
        }

        public async Task<bool> RecoverPassword(Usuario modelo)
        {
            using (var conexion = new SqlConnection(_cadenaSql))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("sp_RecoverPassword", conexion);
                cmd.Parameters.AddWithValue("token", modelo.Token);
                cmd.Parameters.AddWithValue("password", modelo.Password);

                cmd.CommandType = CommandType.StoredProcedure;

                int filas_afectados = await cmd.ExecuteNonQueryAsync();
                if (filas_afectados > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }

            }
        }
    }


   }
