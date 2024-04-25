namespace BienesRaicesBackend.Models.Custom
{
    public class AuthorizationResponse
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public bool Resultado { get; set; }

        public string Msg { get; set; }
    }

    public class AuthorizationRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
    public class RecoverRequest
    {
        public string Email { get; set; }
    }
    public class PasswordRequest
    {
        public string Password { get; set;}
    }
    public class AuthRegisterResponse
    {
        public Guid Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string? Imagen { get; set; }
        public bool? Activo { get; set; }

        public string? Token { get; set; }
 
    }

    public class AuthRegisterRequest
    {
        public Guid Id { get; set; }
        public string? Nombre { get; set; }
        public string? Apellido { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public IFormFile? Imagen { get; set; }
 

    }
}
