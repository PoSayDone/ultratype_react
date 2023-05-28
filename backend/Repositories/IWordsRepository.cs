using backend.Entities;

namespace backend.Repositories
{
    public interface IWordsRepository
    {
        Task<Words> GetWordsAsync(string mask, char mainChar, int len); 
        Task<Words> GetRandomWords(int len);
    }

    public interface IEnglishWordsRepository : IWordsRepository{}
    public interface IRussianWordsRepository : IWordsRepository{}
}