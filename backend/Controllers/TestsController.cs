using System.Net;
using System.Security.Claims;
using backend.Dtos;
using backend.Entities;
using backend.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("tests")]
    public class TestsController : ControllerBase
    {
        private readonly ITestsRepository repo;

        public TestsController(ITestsRepository repository)
        {
            this.repo = repository;
        }

        [HttpGet]
        [Authorize]
        public async Task<IEnumerable<TestDto>> GetTestsAsync()
        {
            User user = GetCurrentUser();
            return (await repo.GetTestsAsync(user.Id)).Select(test => test.AsDto());
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

        [HttpGet("{id}")]
        public async Task<ActionResult<TestDto>> GetTestAsync(Guid id)
        {
            var test = await repo.GetTestAsync(id);
            return test == null ? NotFound() : test.AsDto();
        }

        [HttpPost]
        public async Task<ActionResult> AddTest(AddTestDto testDto)
        {
            Test test = new()
            {
                Id = Guid.NewGuid(),
                UserId = testDto.UserId,
                Mode = testDto.Mode,
                Wpm = testDto.Wpm,
                Accuracy = testDto.Accuracy,
                Date = DateTime.UtcNow
            };
            await repo.AddTestAsync(test);
            return CreatedAtAction(nameof(GetTestAsync), new { id = test.Id }, test.AsDto());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTestAsync(Guid id)
        {
            var existingUser = await repo.GetTestAsync(id);
            if (existingUser == null)
            {
                return NotFound();
            }
            await repo.DeleteTestAsync(id);
            return NoContent();
        }
    }
}