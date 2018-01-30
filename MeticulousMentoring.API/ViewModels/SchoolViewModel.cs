using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MeticulousMentoring.API.Data.Entities;

namespace MeticulousMentoring.API.ViewModels
{
    public class SchoolViewModel
    {
        public int SchoolId { get; set; }
        public string SchoolName { get; set; }
        public Address SchoolAddress { get; set; }
        public string SchoolPrincipal { get; set; }
        public EducationSystem SchoolSystem { get; set; }
        
    }
}
