namespace BienesRaicesBackend.Services.Contracts
{
    public interface IGenericRepository<T> where T : class
    {
        Task<T> GetOne(Guid id);
        Task<List<T>> GetMany();
        Task<T> Save(T modelo);
        Task<bool> Edit(T modelo);
        Task<bool> Delete(Guid id);
 
    }
}
