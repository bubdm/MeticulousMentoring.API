﻿using System;

namespace MeticulousMentoring.API.Data.Entities
{
    public class Classification
    {
        public int id { get; set; }
        public int classification_id { get; set; }
        public string description { get; set; }
        public DateTime? created_on { get; set; }
        public DateTime? modified_on { get; set; }
    }
}