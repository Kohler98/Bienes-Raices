using BienesRaicesBackend.Models;
using BienesRaicesBackend.Services.Contracts;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace BienesRaicesBackend.Services.Repositories
{
    public class CategoryRepository : IGenericRepository<Categorium>
    {
        private readonly string _cadenaSql = "";
        public CategoryRepository(IConfiguration configuracion)
        {
            _cadenaSql = configuracion.GetConnectionString("cadenaSQL");
        }

        public async Task<List<Categorium>> GetMany()
        {
            List<Categorium> _lista = new List<Categorium>();

            using (var conexion = new SqlConnection(_cadenaSql))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("sp_ListaCategorias", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                using (var dr = await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {
 
                        _lista.Add(new Categorium
                        {
                            Id = Convert.ToInt32(dr["id"]),
                            Nombre = dr["nombre"].ToString(),

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

        public Task<bool> Edit(Categorium modelo)
        {
            throw new NotImplementedException();
        }


        public Task<Categorium> Save(Categorium modelo)
        {
            throw new NotImplementedException();
        }

        public Task<Categorium> GetOne(Guid id)
        {
            throw new NotImplementedException();
        }
 
    }
}
