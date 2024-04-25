namespace BienesRaicesBackend.Models.Custom
{
    public class PropiedadesResponse
    {
        public Guid Id { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public int Habitaciones { get; set; }
        public int Estacionamiento { get; set; }
        public int Wc { get; set; }
        public string Imagen { get; set; }
        public string Calle { get; set; }
        public string Lat { get; set; }
        public string Lng { get; set; }
        public bool Publicado { get; set; }
        public string Category { get; set; }
        public string Precio { get; set; }
        public Guid UsuarioId { get; set; }
    }
    public class PropiedadesRequest
    {
        public Guid Id { get; set; }
        public string? Titulo { get; set; }
        public string? Descripcion { get; set; }
        public int? Habitaciones { get; set; }
        public int? Estacionamiento { get; set; }
        public int? Wc { get; set; }
        public IFormFile? Imagen { get; set; }
        public string? Calle { get; set; }
        public string? Lat { get; set; }
        public string? Lng { get; set; }
        public bool? Publicado { get; set; }
        public int? Category { get; set; }
        public int? Precio { get; set; }
        public Guid UsuarioId { get; set; }
    }
}
