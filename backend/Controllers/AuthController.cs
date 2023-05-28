using System.Security.Cryptography;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Dtos;
using backend.Entities;
using backend.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Identity;

namespace backend.Controllers;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly IUserRepository _userRepo;
    private readonly IPasswordHasher<User> _passwordHasher;

    public AuthController(IConfiguration configuration, IUserRepository userRepository, IPasswordHasher<User> passwordHasher)
    {
        _config = configuration;
        _userRepo = userRepository;
        _passwordHasher = passwordHasher;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<User>> Login([FromBody] LoginUserDto userLogin)
    {
        var user = await Authenticate(userLogin);

        if (user != null)
        {
            var token = Generate(user);
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var expirationTime = jwtToken.ValidTo;
            var expiresIn = expirationTime.Subtract(DateTime.UtcNow).TotalSeconds;

            var data = new
            {
                token = token,
                expiresIn = expiresIn,
                user = user.AsDto()
            };

            return Ok(data);
        }

        var existedUser = await _userRepo.GetUserByUsername(userLogin.Username);
        if (existedUser != null)
        {
            return BadRequest("Wrong password");
        }
        return NotFound("User not found");
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult> AddUserAsync(AddUserDto userDto)
    {

        if (await _userRepo.GetUserByUsername(userDto.Username) != null)
        {
            return Conflict("User with this username already exist");
        }

        if (await _userRepo.GetUserByEmail(userDto.Email) != null)
        {
            return Conflict("User with this email already exists");
        }

        User user = new()
        {
            Id = Guid.NewGuid(),
            Email = userDto.Email,
            Username = userDto.Username,
            PasswordHash = _passwordHasher.HashPassword(new User(), userDto.Password)
        };

        await _userRepo.AddUserAsync(user);

        var token = Generate(user);
        var handler = new JwtSecurityTokenHandler();
        var jwtToken = handler.ReadJwtToken(token);
        var expirationTime = jwtToken.ValidTo;
        var expiresIn = expirationTime.Subtract(DateTime.UtcNow).TotalSeconds;

        var data = new
        {
            token = token,
            expiresIn = expiresIn,
            user = user.AsDto()
        };

        return Ok(data);
    }

    private string Generate(User user)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var credentals = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
        };

        var token = new JwtSecurityToken(_config["Jwt:Issuer"],
            _config["Jwt:Audience"],
            claims,
            expires: DateTime.Now.AddDays(30),
            signingCredentials: credentals);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private async Task<User?> Authenticate(LoginUserDto userLogin)
    {
        var currentUser = await _userRepo.GetUserByUsername(userLogin.Username);
        if (currentUser != null && _passwordHasher.VerifyHashedPassword(currentUser, currentUser.PasswordHash, userLogin.Password) == PasswordVerificationResult.Success)
        {
            return currentUser;
        }
        return null;
    }

}