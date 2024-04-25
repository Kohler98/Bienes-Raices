using BienesRaicesBackend.Models;
using BienesRaicesBackend.Services.Contracts;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace BienesRaicesBackend.Services.Repositories
{
    public class PricesRepository : IGenericRepository<Precio>
    {
        private readonly string _cadenaSql = "";
        public PricesRepository(IConfiguration configuracion)
        {
            _cadenaSql = configuracion.GetConnectionString("cadenaSQL");
        }
        public async Task<List<Precio>> GetMany()
        {
            List<Precio> _lista = new List<Precio>();

            using (var conexion = new SqlConnection(_cadenaSql))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("sp_ListaPrecios", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                using (var dr = await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {

                        _lista.Add(new Precio
                        {
                            Id = Convert.ToInt32(dr["id"]),
                            Nombre = dr["nombre"].ToString(),

                        });
                    }
                }
            }
            return _lista;
        }

 

        public Task<bool> Edit(Precio modelo)
        {
            throw new NotImplementedException();
        }

        public Task<Precio> Save(Precio modelo)
        {
            throw new NotImplementedException();
        }

        public Task<Precio> GetOne(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Delete(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}
