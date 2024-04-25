 
using BienesRaicesBackend.Models;
using BienesRaicesBackend.Models.Custom;
using BienesRaicesBackend.Services.Contracts;
 
using Microsoft.AspNetCore.Mvc;


namespace BienesRaicesBackend.Controllers
{

    [ApiController]
    [Route("/[controller]")]
    public class CategoryController : ControllerBase
    {
        public readonly DbBienesRaicesContext _dbcontext;
        private readonly IGenericRepository<Categorium> _categoryRepository;
 
        public CategoryController(IGenericRepository<Categorium> categoryRepository, DbBienesRaicesContext dbcontext)
        {
            _categoryRepository = categoryRepository;
            _dbcontext = dbcontext;

        }
        [HttpGet]
        public async Task<IActionResult> GetCategorias()
        {

            List<Categorium> _lista = await _categoryRepository.GetMany();
            try
            {
                List<CategoryResponse> categories = new List<CategoryResponse>();

                foreach (var categoria in _lista)
                {
                    var category = new CategoryResponse
                    {
                        Id = categoria.Id,
                        Nombre = categoria.Nombre,
 
                    };

                    categories.Add(category);
                }


                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = categories });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status404NotFound, new { mensaje = ex.Message, response = _lista });

            }

        }
    }
}
