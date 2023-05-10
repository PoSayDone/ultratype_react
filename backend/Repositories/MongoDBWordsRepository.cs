using System.Net;
using backend.Entities;
using MongoDB.Bson;
using MongoDB.Driver;

namespace backend.Repositories
{
    public class MongoDBWordsRepository : IWordsRepository
    {

        private const string databaseName = "catalog";
        private const string collectionName = "words";
        private readonly IMongoCollection<BsonDocument> wordsCollection;

        public MongoDBWordsRepository(IMongoClient mongoClient)
        {
            IMongoDatabase database = mongoClient.GetDatabase(databaseName);
            wordsCollection = database.GetCollection<BsonDocument>(collectionName);
        }

        public async Task<Words> GetWordsAsync(string mask, char mainChar)
        {
            var filter = Builders<BsonDocument>.Filter.And(
                Builders<BsonDocument>.Filter.Regex("word", new BsonRegularExpression("^["+mask+"]+$")),
                Builders<BsonDocument>.Filter.Regex("word", new BsonRegularExpression(".*"+mainChar+".*"))
            );
            var words = await wordsCollection.Find(filter).ToListAsync();
            var wordList = words.Select(doc => doc["word"].AsString).ToList();
            return new Words()
            {
                Strings = wordList
            };
        }
    }
}