namespace BienesRaicesBackend.Services.Contracts
{
    public interface IGenericPropertiesRepository<T> where T : class
    {
        Task<T> GetOne(Guid id);
        Task<List<T>> GetMine(Guid id);
        Task<List<T>> GetMany();
        Task<Guid> Save(T modelo);
        Task<bool> Edit(T modelo);
        Task<bool> Delete(Guid propiedadId, Guid usuarioId);

    }
}
