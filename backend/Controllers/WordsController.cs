using backend.Dtos;
using backend.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("words")]
    public class WordsController : ControllerBase
    {
        private readonly IWordsRepository wordsRepo;

        public WordsController(IWordsRepository repository)
        {
            this.wordsRepo = repository;
        }

        [AllowAnonymous]
        [HttpGet("{mask}/{mainChar}/{len}")]
        public async Task<ActionResult<WordsDto>> GetWords(string mask, char mainChar, int len)
        {
            var words = await wordsRepo.GetWordsAsync(mask, mainChar, len);
            return words == null ? NotFound() : words.AsDto();
        }

        [AllowAnonymous]
        [HttpGet("len")]
        public async Task<ActionResult<WordsDto>> GetRandomWords(int len)
        {
            var words = await wordsRepo.GetRandomWords(len);
            return words == null ? NotFound() : words.AsDto();
        }
    }
}