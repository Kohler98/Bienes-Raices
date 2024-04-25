using BienesRaicesBackend.Models;
using BienesRaicesBackend.Services.Contracts;
using Microsoft.Data.SqlClient;
 
using System.Data;
 

namespace BienesRaicesBackend.Services.Repositories
{
    public class PropertiesRepository : IGenericPropertiesRepository<Propiedade>
    {
        private readonly string _cadenaSql = "";
        public PropertiesRepository(IConfiguration configuracion)
        {
            _cadenaSql = configuracion.GetConnectionString("cadenaSQL");
        }

        public async Task<bool> Delete(Guid propiedadId, Guid usuarioId)
        {
            
            using (var conexion = new SqlConnection(_cadenaSql))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("sp_EliminarPropiedad", conexion);
                cmd.Parameters.AddWithValue("id", propiedadId);
                cmd.Parameters.AddWithValue("usuarioId", usuarioId);


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

        public async Task<bool> Edit(Propiedade modelo)
        {
            using (var conexion = new SqlConnection(_cadenaSql))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("sp_EditarPropiedades", conexion);
                cmd.Parameters.AddWithValue("id", modelo.Id);
                cmd.Parameters.AddWithValue("titulo", modelo.Titulo);
                cmd.Parameters.AddWithValue("descripcion", modelo.Descripcion);

                cmd.Parameters.AddWithValue("habitaciones", modelo.Habitaciones);
                cmd.Parameters.AddWithValue("url", modelo.Url);
                cmd.Parameters.AddWithValue("estacionamiento", modelo.Estacionamiento);
                cmd.Parameters.AddWithValue("wc", modelo.Wc);
                cmd.Parameters.AddWithValue("calle", modelo.Calle);
                cmd.Parameters.AddWithValue("lat", modelo.Lat);
                cmd.Parameters.AddWithValue("lng", modelo.Lng);
                cmd.Parameters.AddWithValue("publicado", modelo.Publicado);
                cmd.Parameters.AddWithValue("precioId", modelo.Precio.Id);
                cmd.Parameters.AddWithValue("categoriaId", modelo.Categoria.Id);
                cmd.Parameters.AddWithValue("usuarioId", modelo.UsuarioId);
             

                if (modelo.Imagenes != null && modelo.Imagenes.Any())
                {
                    cmd.Parameters.AddWithValue("imagen", modelo.Imagenes.First().Imagen);
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

        public async Task<List<Propiedade>> GetMany()
        {
            List<Propiedade> _lista = new List<Propiedade>();

            using (var conexion = new SqlConnection(_cadenaSql))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("sp_ListarPropiedades", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                using (var dr = await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {

                        _lista.Add(new Propiedade
                        {
                            Id = (Guid)dr["id"],
                            Titulo = dr["titulo"].ToString(),
                            Descripcion = dr["descripcion"].ToString(),
                            Habitaciones = (int)dr["habitaciones"],
                            Estacionamiento = (int)dr["estacionamiento"],
                            Wc = (int)dr["wc"],
                            Calle = dr["calle"].ToString(),
                            Lat = dr["lat"].ToString(),
                            Lng = dr["lng"].ToString(),
                            Publicado = (bool)dr["publicado"],

                            UsuarioId = (Guid)dr["usuarioId"],
                            Precio = new Precio { Nombre = dr["PriceName"].ToString() },
                            Categoria = new Categorium { Nombre = dr["CategoryName"].ToString() },
                            Url = dr["url"].ToString(),
                        });
                    }
                }
            }
            return _lista;
        }

        public async Task<List<Propiedade>> GetMine(Guid id)
        {
            List<Propiedade> _lista = new List<Propiedade>();

            using (var conexion = new SqlConnection(_cadenaSql))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("sp_MisPropiedades", conexion);
                cmd.Parameters.AddWithValue("usuarioId", id);
                cmd.CommandType = CommandType.StoredProcedure;
                using (var dr = await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {

                        _lista.Add(new Propiedade
                        {
                            Id = (Guid)dr["id"],
                            Titulo = dr["titulo"].ToString(),
                            Descripcion = dr["descripcion"].ToString(),
                            Habitaciones = (int)dr["habitaciones"],
                            Estacionamiento = (int)dr["estacionamiento"],
                            Wc = (int)dr["wc"],
                            Calle = dr["calle"].ToString(),
                            Lat = dr["lat"].ToString(),
                            Lng = dr["lng"].ToString(),
                            Publicado = (bool)dr["publicado"],

                            UsuarioId = (Guid)dr["usuarioId"],
                            Precio = new Precio { Nombre = dr["PriceName"].ToString() },
                            Categoria = new Categorium { Nombre = dr["CategoryName"].ToString() },
                            Url = dr["url"].ToString(),
                        });
                    }
                }
            }
            return _lista;
        }

        public async Task<Propiedade> GetOne(Guid id)
        {
            Propiedade propiedad = new Propiedade();
            using (var conexion = new SqlConnection(_cadenaSql))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("sp_ListarPropiedad", conexion);
 
                cmd.Parameters.AddWithValue("id", id);



                cmd.CommandType = CommandType.StoredProcedure;



                using (var dr = await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {
 
                        propiedad.Id = (Guid)dr["id"];
                        propiedad.Titulo = dr["titulo"].ToString();
                        propiedad.Descripcion = dr["descripcion"].ToString();
                        propiedad.Habitaciones = (int)dr["habitaciones"];
                        propiedad.Estacionamiento = (int)dr["estacionamiento"];
                        propiedad.Wc = (int)dr["wc"];
                        propiedad.Calle = dr["calle"].ToString();
                        propiedad.Lat = dr["lat"].ToString();
                        propiedad.Lng = dr["lng"].ToString();
                        propiedad.Publicado = (bool)dr["publicado"];

                        propiedad.UsuarioId = (Guid)dr["usuarioId"];
                        propiedad.Precio = new Precio { Nombre = dr["PriceName"].ToString() };
                        propiedad.Categoria = new Categorium { Nombre = dr["CategoryName"].ToString() };

                        propiedad.Url = dr["url"].ToString();

                    }
                    return propiedad;
                }
            }
        }

            public async Task<Guid> Save(Propiedade modelo)
            {

                using (var conexion = new SqlConnection(_cadenaSql))
                {
                    Guid id = new Guid();
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("sp_CrearPropiedades", conexion);
                    // @nombre, @apellido, @email, @hashedPassword, @imagen, @activo, @token
                    cmd.Parameters.AddWithValue("titulo", modelo.Titulo);
                    cmd.Parameters.AddWithValue("descripcion", modelo.Descripcion);

                    cmd.Parameters.AddWithValue("habitaciones", modelo.Habitaciones);
                    cmd.Parameters.AddWithValue("estacionamiento", modelo.Estacionamiento);
                    cmd.Parameters.AddWithValue("wc", modelo.Wc);
                    cmd.Parameters.AddWithValue("calle", modelo.Calle);
                    cmd.Parameters.AddWithValue("lat", modelo.Lat);
                    cmd.Parameters.AddWithValue("lng", modelo.Lng);
                    cmd.Parameters.AddWithValue("publicado", modelo.Publicado);
                    cmd.Parameters.AddWithValue("precioId", modelo.Precio.Id);
                    cmd.Parameters.AddWithValue("categoriaId", modelo.Categoria.Id);
                    cmd.Parameters.AddWithValue("usuarioId", modelo.UsuarioId);
                    cmd.Parameters.AddWithValue("imagen", modelo.Imagenes.FirstOrDefault().Imagen);
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
        }
    }
