namespace backend.Entities
{
    public record Test
    {
        public Guid Id { get; set; }
        public Guid UserId { get; init; }
        public string Mode { get; init; }
        public int Wpm { get; init; }
        public float Accuracy { get; init; }
        public DateTime Date { get; set; }
    }
}