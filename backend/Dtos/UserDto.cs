namespace backend.Dtos
{
    public record UserDto {
        public Guid Id { get; init; }   
        public string Name { get; init; }
        public string Password { get; init; }
    }   
}

