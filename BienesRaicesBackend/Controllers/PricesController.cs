 
using BienesRaicesBackend.Models;
using BienesRaicesBackend.Models.Custom;
using BienesRaicesBackend.Services.Contracts;
using BienesRaicesBackend.Services.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BienesRaicesBackend.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class PricesController : ControllerBase
    {
        public readonly DbBienesRaicesContext _dbcontext;
        private readonly IGenericRepository<Precio> _priceRepository;
        public PricesController(IGenericRepository<Precio> priceRepository, DbBienesRaicesContext dbcontext)
        {
            _priceRepository = priceRepository;
            _dbcontext = dbcontext;
        }

        // GET: api/<PricesController>
        [HttpGet]
        public async Task<IActionResult> GetPrecios()
        {
            List<Precio> _lista = await _priceRepository.GetMany();
            try
            {
                List<PricesResponse> precios = new List<PricesResponse>();

                foreach (var precio in _lista)
                {
                    var price = new PricesResponse
                    {
                        Id = precio.Id,
                        Nombre = precio.Nombre,

                    };

                    precios.Add(price);
                }


                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = precios });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status404NotFound, new { mensaje = ex.Message, response = _lista });

            }
        }
    }
}
