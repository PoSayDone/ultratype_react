using System.Net.NetworkInformation;
using backend.Dtos;
using backend.Entities;
using backend.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

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
        [HttpGet("{mask}/{mainChar}")]
        public async Task<ActionResult<WordsDto>> GetWords(string mask, char mainChar)
        {
            var words = await wordsRepo.GetWordsAsync(mask, mainChar);
            return words == null ? NotFound() : words.AsDto();
        }
    }
}