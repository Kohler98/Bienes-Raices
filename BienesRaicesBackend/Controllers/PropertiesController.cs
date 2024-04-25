 
using BienesRaicesBackend.Models;
using BienesRaicesBackend.Models.Custom;
using BienesRaicesBackend.Services.Contracts;
 
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
 
using System.Security.Claims;
 

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BienesRaicesBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PropertiesController : ControllerBase
    {
        public readonly DbBienesRaicesContext _dbcontext;
        private readonly IAlmacenarArchivos _almacenarArchivos;
        private readonly IGenericPropertiesRepository<Propiedade> _propertiesRepository;
 

        public PropertiesController(IGenericPropertiesRepository<Propiedade> propertiesRepository, DbBienesRaicesContext dbcontext, IAlmacenarArchivos almacenarArchivos)
        {
            _dbcontext = dbcontext;
            _almacenarArchivos = almacenarArchivos;
            _propertiesRepository = propertiesRepository;
        }

        // GET: api/<PropertiesController>
        [Authorize]
        [HttpGet("/me")]
        public async Task<IActionResult> MyProperties()
        {
            try
            {
                var claimsPrincipal = HttpContext.User;
                var id = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
                Guid userId = Guid.Parse(id);

                List<Propiedade> _lista = await _propertiesRepository.GetMine(userId);
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
        [HttpGet]
        public async Task<IActionResult> GetProperties()
        {
            try
            {
                List<Propiedade> _lista = await _propertiesRepository.GetMany();
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

        // GET api/<PropertiesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProperty(Guid id)
        {
            try
            {
                Propiedade property = await _propertiesRepository.GetOne(id);

                PropiedadesResponse propiedad = new PropiedadesResponse
                {
                    Id = property.Id,
                    Titulo = property.Titulo,
                    Descripcion = property.Descripcion,
                    Habitaciones = (int)property.Habitaciones,
                    Estacionamiento = (int)property.Estacionamiento,
                    Wc = (int)property.Wc,
                    Calle = property.Calle,
                    Lat = property.Lat,
                    Lng = property.Lng,
                    Publicado = (bool)property.Publicado,
                    Category = property.Categoria.Nombre,
                    Precio = property.Precio.Nombre,
                    UsuarioId = (Guid)property.UsuarioId,
                    Imagen = property.Url,

                };

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = propiedad });
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status404NotFound, new { mensaje = ex.Message, response = "hubo un Error" });

            }
        }
        [Authorize]
        // POST api/<PropertiesController>
        [HttpPost]
        public async Task<IActionResult> PostProperty([FromForm] PropiedadesRequest propiedad)
        {
            try
            {
                var imagen = propiedad.Imagen;
                using var stream = new MemoryStream();

                await imagen.CopyToAsync(stream);

                var fileByte = stream.ToArray();
                Imagene imagenes = new Imagene { Imagen = fileByte };
                var claimsPrincipal = HttpContext.User;
                var id = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
                Guid userId = Guid.Parse(id);

                Propiedade property = new Propiedade
                {

                    Titulo = propiedad.Titulo,
                    Descripcion = propiedad.Descripcion,
                    Habitaciones = (int)propiedad.Habitaciones,
                    Estacionamiento = (int)propiedad.Estacionamiento,
                    Wc = (int)propiedad.Wc,
                    Calle = propiedad.Calle,
                    Lat = propiedad.Lat,
                    Lng = propiedad.Lng,
                    Publicado = (bool)propiedad.Publicado,
                    Precio = new Precio { Id = (int)propiedad.Precio },
                    Categoria = new Categorium { Id = (int)propiedad.Category },
                    UsuarioId = userId,
                    Imagenes = new List<Imagene> { imagenes }

                };
                Guid propiedadId = await _propertiesRepository.Save(property);
                string imagenUrl = await _almacenarArchivos.Crear(fileByte, imagen.ContentType, Path.GetExtension(imagen.FileName), "imagenes", Guid.NewGuid().ToString());
                property.Id = propiedadId;
                property.Url = imagenUrl;
                bool editado = await _propertiesRepository.Edit(property);
                if (editado)
                {
                    return StatusCode(StatusCodes.Status200OK, new
                    {
                        mensaje = "ok",
                        response = "Propiedad Creada con exito"
                    });
                }
                else
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new
                    {
                        mensaje = "ok",
                        response = "editado en falso al momento de crear la propiedad"
                    });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new
                {
                    mensaje = ex.Message,
                    response = "Error al crear propiedad"
                });
            }

        }

        // PUT api/<PropertiesController>/5

        [Authorize]
        [HttpPut]
        [Route("edit/{id:guid}")]
        public async Task<IActionResult> Editar([FromForm] PropiedadesRequest propiedad, Guid id)
        {
            try
            {
                var claimsPrincipal = HttpContext.User;
                var Id = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
                Guid userId = Guid.Parse(Id);
 
                
                Propiedade property = await _propertiesRepository.GetOne(id);
                property.UsuarioId = userId;

                property.Titulo = propiedad.Titulo ?? "";
                property.Descripcion = propiedad.Descripcion ?? "";
                property.Habitaciones = propiedad.Habitaciones ?? 0;
                property.Estacionamiento = propiedad.Estacionamiento ?? 0;
                property.Wc = propiedad.Wc ?? 0;
                property.Calle = propiedad.Calle ?? "";
                property.Lat = propiedad.Lat ?? "";
                property.Lng = propiedad.Lng ?? "";
                property.Publicado = propiedad.Publicado;
                property.Categoria.Id = propiedad.Category ?? 0;
                property.Precio.Id = propiedad.Precio ?? 0;

                if(propiedad.Imagen != null && propiedad.Imagen.Length > 0)
                {
                    string url = Helpers.Helpers.GetImage(property.Url);
                    await _almacenarArchivos.Borrar(url, "imagenes");
                    var imagen = propiedad.Imagen;
                    using var stream = new MemoryStream();

                    await imagen.CopyToAsync(stream);
                    var fileByte = stream.ToArray();
                    Imagene imagenes = new Imagene { Imagen = fileByte };
                    property.Imagenes = new List<Imagene> { imagenes };
                    string imagenUrl = await _almacenarArchivos.Crear(fileByte, imagen.ContentType, Path.GetExtension(imagen.FileName), "imagenes", Guid.NewGuid().ToString());
                    property.Url = imagenUrl;
                }

                bool editado = await _propertiesRepository.Edit(property);
                if (editado)
                {
                    return StatusCode(StatusCodes.Status200OK, new
                    {
                        mensaje = "ok",
                        response = "Propiedad editada con exito"
                    });
                }
                else
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new
                    {
                        mensaje = "ok",
                        response = "editado en falso al momento de editar la propiedad"
                    });
                }
 

            }catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status404NotFound, new { mensaje = ex.Message, response = "hubo un Error" });
            }
        }

        // DELETE api/<PropertiesController>/5
        [Authorize]
        [HttpDelete("{propiedadId}")]
        public async Task<IActionResult> DeleteProperty(Guid propiedadId)
        {
            try
            {
                var claimsPrincipal = HttpContext.User;
                var id = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
                Guid userId = Guid.Parse(id);
                Propiedade property = await _propertiesRepository.GetOne(propiedadId);
                bool borrar = await _propertiesRepository.Delete(propiedadId, userId);
                string url = Helpers.Helpers.GetImage(property.Url);
                await _almacenarArchivos.Borrar(url, "imagenes");

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", response = "propiedad eliminada con exito" });
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status404NotFound, new { mensaje = ex.Message, response = "hubo un Error" });

            }
        }

    }
}


