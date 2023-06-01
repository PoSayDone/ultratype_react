
namespace backend.Entities
{
    public record LettersDto
    {
        public Dictionary<string, Dictionary<string, LetterData>> Data { get; set; }
        
    }
}