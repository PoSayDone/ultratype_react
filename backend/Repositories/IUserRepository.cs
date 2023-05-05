using backend.Entities;

namespace backend.Repositories;

public interface IUserRepository
{
    Task<User> GetUserAsync(Guid id);
    Task<IEnumerable<User>> GetUsersAsync();
    Task AddUserAsync(User user);
    Task UpdateUserAsync(User user);
    Task DeleteUserAsync(Guid id);
    Task<User> GetUserByName(string name);
}