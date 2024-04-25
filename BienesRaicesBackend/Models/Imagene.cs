using System;
using System.Collections.Generic;

namespace BienesRaicesBackend.Models;

public partial class Imagene
{
    public int Id { get; set; }

    public byte[]? Imagen { get; set; }

    public Guid? PropiedadId { get; set; }

    public Guid? UsuarioId { get; set; }

    public virtual Propiedade? Propiedad { get; set; }

    public virtual Usuario? Usuario { get; set; }
}
