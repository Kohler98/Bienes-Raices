namespace BienesRaicesBackend.Services.Contracts
{
    public interface ISearchRepository<T> where T : class
    {
        Task<List<T>> FilterByCategoryAndPrice(int?  categoryId, int? priceId);

        Task<List<T>> FilterBySearch(string termino);
    }
}
