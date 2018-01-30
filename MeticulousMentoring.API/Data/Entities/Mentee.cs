using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeticulousMentoring.API.Data.Entities
{
    public class Mentee
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int? id { get; set; }
        public string first_name { get; set; }
        public string middle { get; set; }
        public string last_name { get; set; }
        public string gender { get; set; }
        public DateTime dob { get; set; }
        public School school { get; set; }
        public Classification classification { get; set; }
        public string email { get; set; }
        public Address address { get; set; }
        public DateTime? created_on { get; set; }
        public DateTime? modified_on { get; set; }
        public bool is_active { get; set; }

    }
}
