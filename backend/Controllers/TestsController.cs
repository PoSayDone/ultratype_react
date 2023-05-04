using backend.Dtos;
using backend.Entities;
using backend.Repositories;
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
        public async Task<IEnumerable<TestDto>> GetTestsAsync(Guid? userId)
        {

            return userId == null ? (await repo.GetTestsAsync()).Select(test => test.AsDto()) : (await repo.GetTestsAsync(userId)).Select(test => test.AsDto());
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
    }
}