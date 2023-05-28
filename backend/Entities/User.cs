namespace backend.Entities
{
    public record User {
        public Guid Id { get; init; }   
        public string Email { get; init; }
        public string Username { get; init; }
        public string PasswordHash { get; init; }
    }
}