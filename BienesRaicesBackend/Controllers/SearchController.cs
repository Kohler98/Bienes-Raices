using BienesRaicesBackend.Models;
using BienesRaicesBackend.Models.Custom;
using BienesRaicesBackend.Services.Contracts;
using BienesRaicesBackend.Services.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BienesRaicesBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        public readonly DbBienesRaicesContext _dbcontext;
 
        private readonly ISearchRepository<Propiedade> _searchRepository;
        public SearchController(ISearchRepository<Propiedade> searchRepository, DbBienesRaicesContext dbcontext)
        {
            _dbcontext = dbcontext;
            _searchRepository = searchRepository;
        }

        // GET: api/<SearchController>
        [HttpPost("/search")]
        public async Task<IActionResult> FilterBySearch([FromBody] SearchRequest search)
        {
            try
            {

                List<Propiedade> _lista = await _searchRepository.FilterBySearch(search.termino);
                List<PropiedadesResponse> propiedades = new List<PropiedadesResponse>();

                foreach (var propiedadOriginal in _lista)
                {
                    var propiedad = new PropiedadesResponse
                    {
                        Id = propiedadOriginal.Id,
                        Titulo = propiedadOriginal.Titulo,
                        Descripcion = propiedadOriginal.Descripcion,
                        Habitaciones = (int)propiedadOriginal.Habitaciones,
                        Estacionamiento = (int)propiedadOriginal.Estacionamiento,
                        Wc = (int)propiedadOriginal.Wc,
                        Calle = propiedadOriginal.Calle,
                        Lat = propiedadOriginal.Lat,
                        Lng = propiedadOriginal.Lng,
                        Imagen = propiedadOriginal.Url,
                        Publicado = (bool)propiedadOriginal.Publicado,
                        Category = propiedadOriginal.Categoria.Nombre,
                        Precio = propiedadOriginal.Precio.Nombre,
                        UsuarioId = (Guid)propiedadOriginal.UsuarioId
                    };

                    propiedades.Add(propiedad);
                }
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = propiedades });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status404NotFound, new { mensaje = ex.Message, response = "Error" });
            }
        }

        // GET api/<SearchController>/5
        [HttpPost("/search/filter")]
        public async Task<IActionResult> FilterByCategoryAndPrice([FromBody] SearchRequest search)
        {
            try
            {

                List<Propiedade> _lista = await _searchRepository.FilterByCategoryAndPrice(search.categoriaId, search.precioId);
                List<PropiedadesResponse> propiedades = new List<PropiedadesResponse>();

                foreach (var propiedadOriginal in _lista)
                {
                    var propiedad = new PropiedadesResponse
                    {
                        Id = propiedadOriginal.Id,
                        Titulo = propiedadOriginal.Titulo,
                        Descripcion = propiedadOriginal.Descripcion,
                        Habitaciones = (int)propiedadOriginal.Habitaciones,
                        Estacionamiento = (int)propiedadOriginal.Estacionamiento,
                        Wc = (int)propiedadOriginal.Wc,
                        Calle = propiedadOriginal.Calle,
                        Lat = propiedadOriginal.Lat,
                        Lng = propiedadOriginal.Lng,
                        Imagen = propiedadOriginal.Url,
                        Publicado = (bool)propiedadOriginal.Publicado,
                        Category = propiedadOriginal.Categoria.Nombre,
                        Precio = propiedadOriginal.Precio.Nombre,
                        UsuarioId = (Guid)propiedadOriginal.UsuarioId
                    };

                    propiedades.Add(propiedad);
                }
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = propiedades });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status404NotFound, new { mensaje = ex.Message, response = "Error" });
            }
        
        }

   
    }
}
