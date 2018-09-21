using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeticulousMentoring.API.Data.Entities
{
    public class SiteAverage
    {
        public int period_id { get; set; }
        public decimal gpa { get; set; }
        public string school_year { get; set; }
    }
}