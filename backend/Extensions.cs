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
            Email = user.Email,
            Username = user.Username,
            Password = user.Password
        };
    }

    public static TestDto AsDto(this Test test)
    {
        return new TestDto()
        {
            Id = test.Id,
            UserId = test.UserId,
            Mode = test.Mode,
            Wpm = test.Wpm,
            Accuracy = test.Accuracy,
            Date = test.Date
        };
    }
}