using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Entities
{
    public record Words
    {
        public List<string> Strings { get; init; }
    }
}