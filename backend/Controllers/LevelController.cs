using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("levels")]
public class LevelController : ControllerBase
{
        private Dictionary<int, string> levelBase = new Dictionary<int, string>()
        {
                {1, "fj"},
                {2,"gh"},
                {3,"fjgh"},
                {4,"dk"},
                {5,"fjghdk"},
                {6,"sl"},
                {7,"ghfjdksl"},
                {8,"a;'"},
                {9,"asdfghjkl;'"}
        };
}