using backend.Dtos;
using backend.Entities;
using backend.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;


[ApiController]
[Route("auth")]
public class AuthController: ControllerBase
{
    private readonly IUserRepository repo;
    public AuthController(IUserRepository repository)
    {
        this.repo = repository;
    }
    [HttpGet("{name}:{password}")]
    public async Task<ActionResult<User>> GetAuth(string name, string password)
    {
        var existedUser = await repo.GetUserByName(name);
        if (existedUser == null)
        {
            return NotFound();
        }
        if (existedUser.Password == password)
        {
            return existedUser;
        }
        else
        {
            return BadRequest("wrong password");
        }
    }
}