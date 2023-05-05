using System.ComponentModel.DataAnnotations;

namespace backend.Dtos;
public record LoginUserDto
{
    [Required]
    public string Username { get; init; }

    [Required]
    public string Password { get; init; }
}