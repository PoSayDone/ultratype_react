using backend.Entities;
using MongoDB.Bson;
using MongoDB.Driver;

namespace backend.Repositories
{
    public class MongoDBLettersRepository : ILettersRepository
    {

        private const string databaseName = "catalog";
        private const string collectionName = "letters";
        private readonly IMongoCollection<Letters> lettersCollection;
        private readonly FilterDefinitionBuilder<Letters> filterBuilder = Builders<Letters>.Filter;

        public MongoDBLettersRepository(IMongoClient mongoClient)
        {
            IMongoDatabase database = mongoClient.GetDatabase(databaseName);
            lettersCollection = database.GetCollection<Letters>(collectionName);
        }

        public async Task InsertLettersAsync(Letters letters)
        {
            var filter = filterBuilder.Eq(existingLetters => existingLetters.UserID, letters.UserID);
            await lettersCollection.ReplaceOneAsync(filter, letters, new ReplaceOptions { IsUpsert = true });
        }

        public async Task<Letters> GetLettersAsync(Guid userId)
        {
            var filter = filterBuilder.Eq(letters => letters.UserID, userId);
            return await lettersCollection.Find(filter).SingleOrDefaultAsync();
        }

    }
}