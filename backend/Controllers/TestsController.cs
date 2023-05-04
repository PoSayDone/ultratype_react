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
        public IEnumerable<TestDto> GetTests(Guid? userId)
        {
            
            return userId == null ? repo.GetTests().Select(test => test.AsDto()) : repo.GetTests(userId).Select(test => test.AsDto()) ;
        }

        [HttpGet("{id}")]
        public ActionResult<TestDto> GetTest(Guid id)
        {
            var test = repo.GetTest(id);
            return test == null ? NotFound() : test.AsDto();
        }

        [HttpPost]
        public void AddTest(AddTestDto testDto)
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
            repo.AddTest(test);
            // return CreatedAtAction(nameof(GetTest), new { id = test.Id }, test.AsDto());
        }

    }
}