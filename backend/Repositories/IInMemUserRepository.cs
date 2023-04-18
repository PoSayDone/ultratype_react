using backend.Entities;

namespace backend.Repositories;

public interface IInMemUserRepository
{
    IEnumerable<User> GetUsers();
    User GetUser(Guid id);

    void AddUser(User user);

    void UpdateUser(User user);

    void DeleteUser(Guid id);
}