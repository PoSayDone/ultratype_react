using backend.Entities;

namespace backend.Repositories;

public interface ITestsRepository
{
    void AddTest(Test test);
    Test GetTest(Guid id);
    IEnumerable<Test> GetTests(
        // Guid userId
        );
}