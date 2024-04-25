 
using BienesRaicesBackend.Models.Custom;
using BienesRaicesBackend.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace BienesRaicesBackend.Services.Repositories
{
    public class JwtServiceRepository : IJwtServiceRepository
    {
        private readonly string _key = "";

        public JwtServiceRepository(IConfiguration configuration)
        {
            _key = configuration.GetValue<string>("JwtSetting:Key");
        }


        public async Task<AuthorizationResponse> ReturnJWT(Guid Id)
        {

            string tokenCreado = GenerateToken(Id);
            return await SaveRefreshJwtHistory(Id, tokenCreado);
        }

        public Task<AuthorizationResponse> ReturnRefreshJWT(RefreshTokenRequest refreshTokenRequest, Guid Id)
        {
            throw new NotImplementedException();
        }
        private string GenerateRefreshToken()
        {
            var byteArray = new byte[64];
            var refreshToken = "";

            using (var mg = RandomNumberGenerator.Create())
            {
                mg.GetBytes(byteArray);
                refreshToken = Convert.ToBase64String(byteArray);

            }
            return refreshToken;
        }
        private string GenerateToken(Guid Id)
        {
            var keyBytes = Encoding.ASCII.GetBytes(_key);

            var claims = new ClaimsIdentity();
            claims.AddClaim(new Claim(ClaimTypes.NameIdentifier, Id.ToString()));

            var creadencialesToken = new SigningCredentials(
                new SymmetricSecurityKey(keyBytes),
                SecurityAlgorithms.HmacSha256Signature
                );

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claims,
                Expires = DateTime.UtcNow.AddMinutes(60),
                SigningCredentials = creadencialesToken,
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenConfig = tokenHandler.CreateToken(tokenDescriptor);

            string tokenCreado = tokenHandler.WriteToken(tokenConfig);

            return tokenCreado;
        }
        private async Task<AuthorizationResponse> SaveRefreshJwtHistory(Guid Id, string Jwt)
        {
            //var historialRefreshToken = new HistorialRefreshToken
            //{
            //    IdUsuario = idUsuario,
            //    Token = token,
            //    RefreshToken = refreshToken,
            //    FechaCreacion = DateTime.UtcNow,
            //    FechaExpiracion = DateTime.UtcNow.AddMinutes(2)
            //};

            //await _context.HistorialRefreshTokens.AddAsync(historialRefreshToken);
            //await _context.SaveChangesAsync();

            return new AuthorizationResponse { Token = Jwt, Resultado = true, Msg = "OK" };
        }
    }
}
