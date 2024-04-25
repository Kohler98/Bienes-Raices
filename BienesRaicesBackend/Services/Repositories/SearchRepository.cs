using BienesRaicesBackend.Models;
using BienesRaicesBackend.Services.Contracts;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace BienesRaicesBackend.Services.Repositories
{
    public class SearchRepository : ISearchRepository<Propiedade>
    {
        private readonly string _cadenaSql = "";
        public SearchRepository(IConfiguration configuracion)
        {
            _cadenaSql = configuracion.GetConnectionString("cadenaSQL");
        }

        public async Task<List<Propiedade>> FilterByCategoryAndPrice(int? categoryId, int? priceId)
        {
            List<Propiedade> _lista = new List<Propiedade>();

            using (var conexion = new SqlConnection(_cadenaSql))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("sp_FiltrarPropiedades", conexion);
                cmd.Parameters.AddWithValue("precioId", priceId);
                cmd.Parameters.AddWithValue("categoriaId", categoryId);
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

        public async Task<List<Propiedade>> FilterBySearch(string termino)
        {
            List<Propiedade> _lista = new List<Propiedade>();

            using (var conexion = new SqlConnection(_cadenaSql))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("sp_BuscarPropiedad", conexion);
                cmd.Parameters.AddWithValue("termino", termino);
 
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
    }
}
