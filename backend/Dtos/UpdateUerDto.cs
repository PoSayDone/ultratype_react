using System.ComponentModel.DataAnnotations;

namespace backend.Dtos;

public record UpdateUserDto {
    [Required]
    public string Name { get; init; }
    
    [Required]
    public string Password { get; init; }
} 