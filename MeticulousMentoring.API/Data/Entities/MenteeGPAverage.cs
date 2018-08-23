﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeticulousMentoring.API.Data.Entities
{
    public class MenteeGPAverage
    {
        public int id { get; set; }
        public int user_id { get; set; }
        public int grade_period_id { get; set; }
        public decimal gpa { get; set; }
        public DateTime created_on { get; set; }
        public string school_year { get; set; }
    }
}