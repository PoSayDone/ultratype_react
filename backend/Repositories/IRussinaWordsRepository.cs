using backend.Entities;

namespace backend.Repositories;

public interface IRussinaWordsRepository
{
    Task<Words> GetWordsAsync(string mask, char mainChar, int len); 
    Task<Words> GetRandomWords(int len);
}