using System.Data.Common;
using System.Collections.Generic;
using backend.Entities;

namespace backend.Repositories {
    public class InMemUserRepository : IInMemUserRepository
    {
        private readonly List<User> users = new() {
            new User { Id = Guid.NewGuid(), Name = "Egorik", Password = "traher228" },
            new User { Id = Guid.NewGuid(), Name = "Vladosik", Password = "elPiluliTeperPisyaNeStoit1337" },
            new User { Id = Guid.NewGuid(), Name = "Maksim", Password = "animelover" },
            new User { Id = Guid.NewGuid(), Name = "Hecker", Password = "superstrongpassword" }
        };

        public IEnumerable<User> GetUsers() => users;

        public User GetUser(Guid id) => users.Where(user => user.Id == id).SingleOrDefault();

        public void AddUser(User user) => users.Add(user);
        public void UpdateUser(User user)
        {
            int index = users.FindIndex(existingItem => existingItem.Id == user.Id);
            users[index] = user;
        }

        public void DeleteUser(Guid id)
        {
            
        }
    }
}