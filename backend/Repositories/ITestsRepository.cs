using backend.Entities;

namespace backend.Repositories;

public interface ITestsRepository
{
    Task AddTestAsync(Test test);
    Task<Test> GetTestAsync(Guid id);
    Task DeleteTestAsync(Guid id);
    Task<IEnumerable<Test>> GetTestsAsync(Guid? userId = null);
}