using backend.Entities;
using MongoDB.Driver;

namespace backend.Repositories{
    public class MongoDBRepository : IInMemUserRepository
    {

        private const string databaseName = "backend";
        private const string collectionName = "users";
        private readonly IMongoCollection<User> userCollection;

        public MongoDBRepository(IMongoClient mongoClient){
            IMongoDatabase database = mongoClient.GetDatabase(databaseName);
            userCollection = database.GetCollection<User>(collectionName);
        }

        public void AddUser(User user)
        {
            userCollection.InsertOne(user);
        }

        public void DeleteUser(Guid id)
        {
            
        }

        public User GetUser(Guid id)
        {
            return userCollection.Find<User>(user => user.Id == id).Single<User>();
        }

        public IEnumerable<User> GetUsers()
        {
            throw new NotImplementedException();
        }

        public void UpdateUser(User user)
        {
            throw new NotImplementedException();
        }
    }
}