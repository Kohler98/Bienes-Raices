using System;
using System.Collections.Generic;

namespace BienesRaicesBackend.Models;

public partial class Precio
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public virtual ICollection<Propiedade> Propiedades { get; set; } = new List<Propiedade>();
}
