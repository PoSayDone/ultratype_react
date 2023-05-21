using backend.Dtos;
using backend.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("words/ru")]
    public class RussianWordsController : ControllerBase
    {
        private readonly IRussianWordsRepository wordsRepo;

        public RussianWordsController(IRussianWordsRepository repository)
        {
            wordsRepo = repository;
        }

        [AllowAnonymous]
        [HttpGet("{mask}/{mainChar}/{len}")]
        public async Task<ActionResult<WordsDto>> GetWords(string mask, char mainChar, int len)
        {
            var words = await wordsRepo.GetWordsAsync(mask, mainChar, len);
            return words == null ? NotFound() : words.AsDto();
        }

        [AllowAnonymous]
        [HttpGet("random/{len}")]
        public async Task<ActionResult<WordsDto>> GetRandomWords(int len)
        {
            var words = await wordsRepo.GetRandomWords(len);
            return words == null ? NotFound() : words.AsDto();
        }
    }
}