using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos
{
    public record AddTestDto
    {

        [Required]
        public string Mode { get; init; }
        [Required]
        public int Wpm { get; init; }
        [Required]
        public float Accuracy { get; init; }
    }
}