using System.Reflection.Metadata;
using System.Security.Principal;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Dtos;
using backend.Entities;
using backend.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers;

[ApiController]
[Route("login")]
public class AuthController : ControllerBase
{
    private IConfiguration _config;
    private readonly IUserRepository repo;

    public AuthController(IConfiguration configuration, IUserRepository repository)
    {
        this._config = configuration;
        this.repo = repository;
    }

    [AllowAnonymous]
    [HttpPost]
    public async Task<ActionResult<User>> Login([FromBody] LoginUserDto userLogin)
    {
        var user = await Authenticate(userLogin);

        if (user != null)
        {
            var token = Generate(user);
            var data = new {
                token = token,
            };
            return Ok(data);
        }

        return NotFound("User not found");
    }

    private string Generate(User user)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var credentals = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Email, user.Email),
        };

        var token = new JwtSecurityToken(_config["Jwt:Issuer"],
            _config["Jwt:Audience"],
            claims,
            expires: DateTime.Now.AddMinutes(15),
            signingCredentials: credentals);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private async Task<User?> Authenticate(LoginUserDto userLogin)
    {
        var currentUser = await repo.GetUserByNameAndPass(userLogin.Username, userLogin.Password);
        if (currentUser != null)
        {
            return currentUser;
        }
        return null;
    }

}