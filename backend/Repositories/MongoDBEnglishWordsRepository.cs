using backend.Entities;
using MongoDB.Bson;
using MongoDB.Driver;

namespace backend.Repositories
{
    public class MongoDBEnglishWordsRepository : IEnglishWordsRepository
    {

        private const string databaseName = "catalog";
        private const string collectionName = "englishWords";
        private readonly IMongoCollection<BsonDocument> wordsCollection;

        public MongoDBEnglishWordsRepository(IMongoClient mongoClient)
        {
            IMongoDatabase database = mongoClient.GetDatabase(databaseName);
            wordsCollection = database.GetCollection<BsonDocument>(collectionName);
        }

        public async Task<Words> GetWordsAsync(string mask, char mainChar, int len)
        {
            var filter = Builders<BsonDocument>.Filter.And(
                Builders<BsonDocument>.Filter.Regex("word", new BsonRegularExpression("^["+mask+"]+$")),
                Builders<BsonDocument>.Filter.Regex("word", new BsonRegularExpression(".*"+mainChar+".*"))
            );
            var words = await wordsCollection.Find(filter).ToListAsync();
            var wordList = words.Select(doc => doc["word"].AsString).ToList();
            var randomWordList = new List<string>();
            for (int i = 0; i < len; i++)
            {
                Random rnd = new Random();
                randomWordList.Add(wordList[rnd.Next(0,wordList.Count)]);
            }
            return new Words()
            {
                Strings = randomWordList
            };
        }

        public async Task<Words> GetRandomWords(int len)
        {
            var words = await wordsCollection.Find(new BsonDocument()).ToListAsync();
            var randomList = words.Select(doc => doc["word"].AsString).ToList();
            var wordList = new List<string>();
            for (int i = 0; i < len; i++)
            {
                Random rnd = new Random();
                wordList.Add(randomList[rnd.Next(0,words.Count-1)]);
            }

            return new Words()
            {
                Strings = wordList
            };
        }
    }
}