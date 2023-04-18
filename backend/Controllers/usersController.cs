using backend.Dtos;
using backend.Entities;
using backend.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("users")]
    public class UserController : ControllerBase
    {
        private readonly IInMemUserRepository repo;

        public UserController(IInMemUserRepository repository)
        {
            this.repo = repository;
        }

        [HttpGet]
        public IEnumerable<UserDto> GetUsers() => repo.GetUsers().Select(user => user.AsDto());

        [HttpGet("{id}")]
        public ActionResult<UserDto> GetUser(Guid id)
        {
            return repo.GetUser(id) == null ? NotFound() : repo.GetUser(id).AsDto();
        }

        [HttpPost]
        public ActionResult<UserDto> AddUser(AddUserDto itemDto)
        {
            User user = new()
            {
                Id = Guid.NewGuid(),
                Name = itemDto.Name,
                Password = itemDto.Password
            };
            
            repo.AddUser(user);

            return CreatedAtAction(nameof(AddUser), new { id = user.Id}, user.AsDto() );
        }

        [HttpPut("{id}")]
        public ActionResult UpdateUser(Guid id, UpdateUserDto userDto)
        {
            User existingUser = repo.GetUser(id);

            if (existingUser is null)
            {
                return NotFound();
            }

            User updatedUser = existingUser with
            {
                Name = userDto.Name,
                Password = userDto.Password
            };
            
            repo.UpdateUser(updatedUser);
            return NoContent();
        }
        
    }
}