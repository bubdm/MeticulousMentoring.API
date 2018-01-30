using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeticulousMentoring.API.Data.Entities
{
    public class Grade
    {
        public int id { get; set; }
        public int mentee_id { get; set; }
        public Course grade_course { get; set; }


    }
}
