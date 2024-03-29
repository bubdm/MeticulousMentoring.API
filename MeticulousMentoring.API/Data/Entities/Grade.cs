﻿using System;

namespace MeticulousMentoring.API.Data.Entities
{
    public class Grade
    {
        public int id { get; set; }
        public int mentee_id { get; set; }
        public Course grade_course { get; set; }
        public GradePeriod period { get; set; }
        public decimal grade_value { get; set; }
        public DateTime? created_on { get; set; }
        public DateTime? modified_on { get; set; }
        public decimal grade_point { get; set; }
        public string school_year { get; set; }
    }
}