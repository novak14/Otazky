using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrakceAngular.Models
{
    public class Questions
    {
        public int QuestionId { get; set; }
        public string Question { get; set; }

        public List<Answers> Answers { get; set; } = new List<Answers>();
    }
}
