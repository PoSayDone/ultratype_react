using System.Security.Claims;
using backend.Dtos;
using backend.Entities;
using backend.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("letters")]
    public class LettersController : ControllerBase
    {
        private readonly ILettersRepository lettersRepo;

        public LettersController(ILettersRepository repository)
        {
            this.lettersRepo = repository;
        }

        [HttpPost("setLetters")]
        [Authorize]
        public async Task<ActionResult> AddLetters(LettersDto lettersDto)
        {
            User currentUser = GetCurrentUser();
            Letters letters = new()
            {
                UserID = currentUser.Id,
                Data = lettersDto.Data
            };
            await lettersRepo.InsertLettersAsync(letters);
            return Ok();
        }

        [HttpGet("{getLetters}")]
        [Authorize]
        public async Task<ActionResult<LettersDto>> GetLetters()
        {
            User currentUser = GetCurrentUser();
            var letters = await lettersRepo.GetLettersAsync(currentUser.Id);
            return letters == null ? NotFound() : letters.AsDto();
        }

        private User GetCurrentUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                var userClaims = identity.Claims;
                return new User
                {
                    Username = userClaims.FirstOrDefault(prop => prop.Type == ClaimTypes.Name)?.Value,
                    Email = userClaims.FirstOrDefault(prop => prop.Type == ClaimTypes.Email)?.Value,
                    Id = new Guid(userClaims.FirstOrDefault(prop => prop.Type == ClaimTypes.NameIdentifier)?.Value),
                };
            }
            return null;
        }
    }
}