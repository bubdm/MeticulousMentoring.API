using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeticulousMentoring.API.Data
{
    public class GradesDto
    {
        public int mentee_id { get; set; }
        public int course_id { get; set; }
        public int period_id { get; set; }
        public decimal grade_value { get; set; }
        public DateTime? created_on { get; set; }
        public DateTime? modified_on { get; set; }
        public decimal grade_point { get; set; }
        public string school_year { get; set; }
    }
}