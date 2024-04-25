using System;
using System.Collections.Generic;

namespace BienesRaicesBackend.Models;

public partial class Propiedade
{
    public Guid Id { get; set; }

    public string? Titulo { get; set; }

    public string? Descripcion { get; set; }

    public int? Habitaciones { get; set; }

    public int? Estacionamiento { get; set; }

    public int? Wc { get; set; }

    public string? Url { get; set; }

    public string? Calle { get; set; }

    public string? Lat { get; set; }

    public string? Lng { get; set; }

    public bool? Publicado { get; set; }

    public int? PrecioId { get; set; }

    public int? CategoriaId { get; set; }

    public Guid? UsuarioId { get; set; }

    public virtual Categorium? Categoria { get; set; }

    public virtual ICollection<Imagene> Imagenes { get; set; } = new List<Imagene>();

    public virtual ICollection<Mensaje> Mensajes { get; set; } = new List<Mensaje>();

    public virtual Precio? Precio { get; set; }

    public virtual Usuario? Usuario { get; set; }
}
