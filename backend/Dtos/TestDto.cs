using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos
{
    public record TestDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; init; }
        public string Mode { get; init; }
        public int Wpm { get; init; }
        public float Accuracy { get; init; }
        public string Date { get; set; }
    }
}