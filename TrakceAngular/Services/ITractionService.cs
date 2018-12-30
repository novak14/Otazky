using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TrakceAngular.Models;

namespace TrakceAngular.Services
{
    public interface ITractionService
    {
        List<Questions> GetTractions();
    }
}
