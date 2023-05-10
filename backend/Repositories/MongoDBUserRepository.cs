using backend.Entities;
using MongoDB.Bson;
using MongoDB.Driver;

namespace backend.Repositories{
    public class MongoDBUserRepository : IUserRepository
    {

        private const string databaseName = "catalog";
        private const string collectionName = "users";
        private readonly IMongoCollection<User> userCollection;
        private readonly FilterDefinitionBuilder<User> filterBuilder = Builders<User>.Filter;

        public MongoDBUserRepository(IMongoClient mongoClient){
            IMongoDatabase database = mongoClient.GetDatabase(databaseName);
            userCollection = database.GetCollection<User>(collectionName);
        }

        public async Task AddUserAsync(User user)
        {
            await userCollection.InsertOneAsync(user);
        }

        public async Task DeleteUserAsync(Guid id)
        {
            var filter = filterBuilder.Eq(user => user.Id, id);
            await userCollection.DeleteOneAsync(filter);
        }

        public async Task<User> GetUserAsync(Guid id)
        {
            var filter = filterBuilder.Eq(user => user.Id, id);
            return await userCollection.Find(filter).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await userCollection.Find(new BsonDocument()).ToListAsync();
        }

        public async Task UpdateUserAsync(User user)
        {
            var filter = filterBuilder.Eq(existingUser => existingUser.Id, user.Id);
            await userCollection.ReplaceOneAsync(filter, user);
        }

        public async Task<User> GetUserByNameAndPass(string name, string password)
        {
            var filter = filterBuilder.Eq(user => user.Username, name) & filterBuilder.Eq(user => user.Password, password) ;
            return await userCollection.Find(filter).SingleOrDefaultAsync();
        }
        public async Task<User> GetUserByUsername(string name)
        {
            var filter = filterBuilder.Eq(user => user.Username, name);
            return await userCollection.Find(filter).SingleOrDefaultAsync();
        }
        
        public async Task<User> GetUserByEmail(string email)
        {
            var filter = filterBuilder.Eq(user => user.Email, email);
            return await userCollection.Find(filter).SingleOrDefaultAsync();
        }
    }
}