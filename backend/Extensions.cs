using backend.Dtos;
using backend.Entities;

namespace backend;

public static class Extensions
{
    public static UserDto AsDto( this User user)
    {
        return new UserDto()
        {
            Id = user.Id,
            Name = user.Name,
            Password = user.Password
        };
    }
}