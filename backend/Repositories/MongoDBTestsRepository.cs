using backend.Entities;
using MongoDB.Bson;
using MongoDB.Driver;

namespace backend.Repositories
{
    public class MongoDBTestsRepository : ITestsRepository
    {
        private const string databaseName = "catalog";
        private const string collectionName = "tests";
        private readonly IMongoCollection<Test> testsCollection;
        private readonly FilterDefinitionBuilder<Test> filterBuilder = Builders<Test>.Filter;

        public MongoDBTestsRepository(IMongoClient mongoClient)
        {
            IMongoDatabase database = mongoClient.GetDatabase(databaseName);
            testsCollection = database.GetCollection<Test>(collectionName);
        }

        public async Task AddTestAsync(Test test)
        {
            await testsCollection.InsertOneAsync(test);
        }

        public async Task<Test> GetTestAsync(Guid id)
        {
            var filter = filterBuilder.Eq(test => test.Id, id);
            return await testsCollection.Find(filter).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<Test>> GetTestsAsync(Guid? userId)
        {
            var filter = filterBuilder.Eq(test => test.UserId, userId);
            return userId == null ? await testsCollection.Find(new BsonDocument()).ToListAsync() : await testsCollection.Find(filter).ToListAsync();
        }
        
        public async Task DeleteTestAsync(Guid id)
        {
            var filter = filterBuilder.Eq(test => test.Id, id);
            await testsCollection.DeleteOneAsync(filter);
        }
    }
}