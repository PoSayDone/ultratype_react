using System.ComponentModel.DataAnnotations;

namespace backend.Dtos;

public record UpdateUserDto {
    [Required]
    public string Email { get; init; }
    [Required]
    public string Username { get; init; }
    
    [Required]
    public string Password { get; init; }
} 