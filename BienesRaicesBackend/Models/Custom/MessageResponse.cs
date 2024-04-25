namespace BienesRaicesBackend.Models.Custom
{
    public class MessageResponse
    {
        public Guid propietarioId { get; set; }
        public Guid usuarioId { get; set; }
        public Guid propiedadId { get; set; }
        public string usuarioApellido {  get; set; }
        public string usuarioNombre { get; set; }
        public string Message { get; set; }
        public string Image {  get; set; }
        public Boolean isOwner { get; set; }
    }
    public class MessageRequest
    {
 
        public Guid usuarioId { get; set; }
        public Guid propiedadId { get; set; }
        public string Message { get; set; }
    }
    
}
