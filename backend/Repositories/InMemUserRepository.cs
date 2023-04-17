using System.Data.Common;
using System.Collections.Generic;
using backend.Entities;

namespace backend.Repositories {
    public class InMemUserRepository {
        private readonly List<User> users = new() {
            new User { Id = Guid.NewGuid(), Name = "Egorik", Password = "traher228" },
            new User { Id = Guid.NewGuid(), Name = "Vladosik", Password = "elPiluliTeperPisyaNeStoit1337" },
            new User { Id = Guid.NewGuid(), Name = "Maksim", Password = "animelover" },
            new User { Id = Guid.NewGuid(), Name = "Hecker", Password = "superstrongpassword" }
        };

        public IEnumerable<User> GetUsers() => users;

        public User GetUser(Guid id) => users.Where(user => user.Id == id).SingleOrDefault();
    }
}