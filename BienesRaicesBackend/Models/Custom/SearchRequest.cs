namespace BienesRaicesBackend.Models.Custom
{
    public class SearchRequest
    {
        public int? precioId { get; set; }
        public int? categoriaId { get; set; }
        public string? termino { get; set; }
    }
}
