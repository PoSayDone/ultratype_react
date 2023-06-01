using backend.Entities;

namespace backend.Repositories
{
    public interface ILettersRepository
    {
        Task InsertLettersAsync(Letters letters);
        Task<Letters> GetLettersAsync(Guid userId);
    }
}