using System;
using System.Collections.Generic;

namespace BienesRaicesBackend.Models;

public partial class Mensaje
{
    public int Id { get; set; }

    public string? Contenido { get; set; }

    public DateTime? Fecha { get; set; }

    public Guid? PropiedadId { get; set; }

    public Guid? UsuarioId { get; set; }

    public virtual Propiedade? Propiedad { get; set; }

    public virtual Usuario? Usuario { get; set; }
}
