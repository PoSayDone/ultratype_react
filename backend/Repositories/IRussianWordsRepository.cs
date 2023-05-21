using backend.Entities;

namespace backend.Repositories;

public interface IRussianWordsRepository
{
    Task<Words> GetWordsAsync(string mask, char mainChar, int len); 
    Task<Words> GetRandomWords(int len);
}