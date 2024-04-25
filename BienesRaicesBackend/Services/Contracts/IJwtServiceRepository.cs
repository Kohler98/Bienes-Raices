 
using BienesRaicesBackend.Models.Custom;

namespace BienesRaicesBackend.Services.Contracts
{
    public interface IJwtServiceRepository
    {
        Task<AuthorizationResponse> ReturnJWT(Guid Id);
        Task<AuthorizationResponse> ReturnRefreshJWT(RefreshTokenRequest refreshTokenRequest, Guid Id) ;
    }
}
