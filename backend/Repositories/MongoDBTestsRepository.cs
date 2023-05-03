using System.Data.Common;
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

        public void AddTest(Test test)
        {
            testsCollection.InsertOne(test);
        }

        public Test GetTest(Guid id)
        {
            var filter = filterBuilder.Eq(test => test.Id, id);
            return testsCollection.Find(filter).SingleOrDefault();
        }

        public IEnumerable<Test> GetTests(
            // Guid userId
            )
        {
            // var filter = filterBuilder.Eq(test => test.UserId, userId);
            return testsCollection.Find(new BsonDocument()).ToList();
        }
    }
}