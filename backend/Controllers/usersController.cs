using backend.Entities;
using backend.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers {
    
    [ApiController]
    [Route("users")]
    public class UserController : ControllerBase{
        private readonly InMemUserRepository repo;

        public UserController(){
            repo = new();
        }

        [HttpGet]
        public IEnumerable<User> GetUsers() => repo.GetUsers();

        [HttpGet("{id}")]
        public ActionResult<User> GetUser(Guid id) {
            return repo.GetUser(id) == null ? NotFound() : repo.GetUser(id);
            }
    }

}