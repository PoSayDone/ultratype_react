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
        private readonly IUserRepository repo;

        public UserController(IUserRepository repository)
        {
            this.repo = repository;
        }

        [HttpGet]
        public async Task<IEnumerable<UserDto>> GetUsersAsync()
        {
            return (await repo.GetUsersAsync()).Select(user => user.AsDto());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUser(Guid id)
        {
            var user = await repo.GetUserAsync(id);
            return user == null ? NotFound() : user.AsDto();
        }

        [HttpPost]
        public async Task<ActionResult> AddUserAsync(AddUserDto itemDto)
        {
            User user = new()
            {
                Id = Guid.NewGuid(),
                Name = itemDto.Name,
                Password = itemDto.Password
            };

            await repo.AddUserAsync(user);
            return CreatedAtAction(nameof(GetUsersAsync), new { id = user.Id }, user.AsDto());

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateUserAsync(Guid id, UpdateUserDto userDto)
        {
            User existingUser = await repo.GetUserAsync(id);

            if (existingUser is null)
            {
                return NotFound();
            }

            User updatedUser = existingUser with
            {
                Name = userDto.Name,
                Password = userDto.Password
            };

            await repo.UpdateUserAsync(updatedUser);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUserAsync(Guid id)
        {
            var existingUser = await repo.GetUserAsync(id);
            if (existingUser == null)
            {
                return NotFound();
            }
            await repo.DeleteUserAsync(id);
            return NoContent();
        }
    }
}