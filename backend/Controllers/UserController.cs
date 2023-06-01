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
        private readonly IUserRepository userRepo;

        public UserController(IUserRepository repository)
        {
            this.userRepo = repository;
        }

        // [HttpGet("getUsers")]
        // public async Task<IEnumerable<UserDto>> GetUsersAsync()
        // {
        //     return (await userRepo.GetUsersAsync()).Select(user => user.AsDto());
        // }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUser(Guid id)
        {
            var user = await userRepo.GetUserAsync(id);
            return user == null ? NotFound() : user.AsDto();
        }


        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateUserAsync(Guid id, UpdateUserDto userDto)
        {
            User existingUser = await userRepo.GetUserAsync(id);

            if (existingUser is null)
            {
                return NotFound();
            }

            User updatedUser = existingUser with
            {
                Username = userDto.Username,
                PasswordHash = userDto.PasswordHash
            };

            await userRepo.UpdateUserAsync(updatedUser);
            return NoContent();
        }

        // [HttpDelete("{id}")]
        // public async Task<ActionResult> DeleteUserAsync(Guid id)
        // {
        //     var existingUser = await userRepo.GetUserAsync(id);
        //     if (existingUser == null)
        //     {
        //         return NotFound();
        //     }
        //     await userRepo.DeleteUserAsync(id);
        //     return NoContent();
        // }
    }
}