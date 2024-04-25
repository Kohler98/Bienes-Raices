using System.Security.Cryptography.X509Certificates;
namespace BienesRaicesBackend.Models.Custom
{
    public class RefreshTokenRequest
    {
        public string TokenExpirado { get; set; }
        public string RefreshToken { get; set; }
    }
}
