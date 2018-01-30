using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeticulousMentoring.Web.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    public class AppController : Controller
    {
        public IActionResult Index()
        {
            ViewBag.Title = "Meticulous Mentoring";
            return this.View();
        }

        public IActionResult Login()
        {
            return this.View();
        }
    }
}
