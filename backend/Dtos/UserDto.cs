﻿namespace backend.Dtos
{
    public record UserDto {
        public Guid Id { get; init; }
        public string Email { get; init; }
        public string Username { get; init; }
    }   
}