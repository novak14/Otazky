using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TrakceAngular.Services;

namespace TrakceAngular.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        [HttpGet("[action]")]
        public IActionResult Login(string password)
        {
            if (password == "PlutoNeníPlaneta10")
            {
                var key = Utils.GetUniqueKey(10);
                return Ok(new { Token = key });
            }
            return BadRequest();
        }
    }
}
