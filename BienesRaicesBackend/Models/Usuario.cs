using System;
using System.Collections.Generic;

namespace BienesRaicesBackend.Models;

public partial class Usuario
{
    public Guid Id { get; set; }

    public string? Nombre { get; set; }

    public string? Apellido { get; set; }

    public string? Email { get; set; }

    public string? Url { get; set; }

    public string? Password { get; set; }

    public bool? Activo { get; set; }

    public string? Token { get; set; }

    public byte[]? Imagen { get; set; }

    public virtual ICollection<Imagene> Imagenes { get; set; } = new List<Imagene>();

    public virtual ICollection<Mensaje> Mensajes { get; set; } = new List<Mensaje>();

    public virtual ICollection<Propiedade> Propiedades { get; set; } = new List<Propiedade>();
}
