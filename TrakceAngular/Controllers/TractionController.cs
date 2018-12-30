using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TrakceAngular.Models;
using TrakceAngular.Services;

namespace TrakceAngular.Controllers
{
    [Route("api/[controller]")]
    public class TractionController : Controller
    {
        private readonly ITractionService tractionService;

        public TractionController(ITractionService tractionService)
        {
            this.tractionService = tractionService;
        }

        [HttpGet("[action]")]
        public List<Questions> GetAll()
        {
            var questions = tractionService.GetTractions();
            return questions;
        }

        [HttpGet("[action]")]
        public Questions Get()
        {
            var questions = tractionService.GetTractions().FirstOrDefault();
            return questions;
        }

        [HttpGet("[action]")]
        public Questions Get(int questionId)
        {
            var questions = tractionService.GetTractions().FirstOrDefault(q => q.QuestionId == questionId);
            return questions;
        }

        [HttpGet("[action]")]
        public Questions Get(int[] questionsIds)
        {
            var questions = tractionService.GetTractions().FirstOrDefault();
            return questions;
        }
    }
}
