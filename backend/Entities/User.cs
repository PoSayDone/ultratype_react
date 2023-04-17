namespace backend.Entities
{
    public record User {
        public Guid Id { get; init; }   
        public string Name { get; init; }
        public string Password { get; init; }
    }
}