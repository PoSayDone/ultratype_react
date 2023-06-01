using MongoDB.Bson.Serialization.Attributes;

namespace backend.Entities
{
    [BsonIgnoreExtraElements]
    public record Letters
    {
        public Guid UserID;
        public Dictionary<string, Dictionary<string, LetterData>> Data { get; set; }
    }

    public record LetterData
    {
        public double Wpm { get; set; }
        public double ErrorRate { get; set; }
        public double Confidence { get; set; }
        public int TypedCounter { get; set; }
        public int ErrorCounter { get; set; }
        public double TimeElapsed { get; set; }
    }
}