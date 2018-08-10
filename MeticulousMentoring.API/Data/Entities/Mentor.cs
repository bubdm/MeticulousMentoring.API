using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MeticulousMentoring.API.Data.Entities
{
    public class Mentor
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int? id { get; set; }

        public int? addressid { get; set; }

        public string first_name { get; set; }
        public string last_name { get; set; }
        public string gender { get; set; }
        public Address address { get; set; }
        public bool is_active { get; set; }
        public string email { get; set; }
        public ICollection<Mentee> mentees { get; set; }
        public DateTime? created_on { get; set; }
        public DateTime? modified_on { get; set; }
    }
}