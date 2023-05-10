using System.Globalization;
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
            // Password = user.Password
        };
    }

    public static TestDto AsDto(this Test test)
    {

        string hours = test.Date.Hour / 10 == 0 ? $"0{test.Date.Hour}" : test.Date.Hour.ToString();
        string minutes = test.Date.Minute / 10 == 0 ? $"0{test.Date.Minute}" : test.Date.Minute.ToString();
        string days = test.Date.Day / 10 == 0 ? $"0{test.Date.Day}" : test.Date.Day.ToString();
        string month = test.Date.Month / 10 == 0 ? $"0{test.Date.Month}" : test.Date.Month.ToString();
        return new TestDto()
        {
            Id = test.Id,
            UserId = test.UserId,
            Mode = test.Mode,
            Wpm = test.Wpm,
            Accuracy = test.Accuracy,
            Date = $"{hours}:{minutes}  {days}.{month}.{test.Date.Year}"
        };
    }

    public static WordsDto AsDto(this Words words)
    {
        return new WordsDto(){
            Strings = words.Strings
        };
    }
}