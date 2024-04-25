 
using BienesRaicesBackend.Models.Custom;

namespace BienesRaicesBackend.Services.Contracts
{
    public interface IGenericAuthRepository<T> where T : class
    {
        Task<T> GetOne(Guid id);
        Task<List<T>> GetMany();
        Task<bool> Edit(T modelo, Guid id);

        Task<T> Save(AuthRegisterResponse modelo);
        Task<bool> ConfirmAccount(string token);

        Task<T> ForgotPassword(string email);
        Task<bool> RecoverPassword(T modelo);
        Task<Guid> Login(AuthorizationRequest modelo);
        Task<bool> Delete(Guid id);
    }
}
