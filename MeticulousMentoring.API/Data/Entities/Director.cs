using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace MeticulousMentoring.API.Data.Entities
{
    public class Director
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int? id { get; set; }

        public string first_name { get; set; }
        public string last_name { get; set; }
        public bool is_active { get; set; }
        public string email { get; set; }
        public DateTime? created_on { get; set; }
        public DateTime? modified_on { get; set; }
    }
}