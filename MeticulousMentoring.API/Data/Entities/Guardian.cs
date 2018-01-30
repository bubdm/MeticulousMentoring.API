using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeticulousMentoring.API.Data.Entities
{
    public class Guardian
    {
        public int id { get; set; }
        public string first_name { get; set; }
        public string middle { get; set; }
        public string last_name { get; set; }
        public string gender { get; set; }
        public Address address { get; set; }
        public ICollection<Mentee> children { get; set; }
        public DateTime? created_on { get; set; }
        public DateTime? modified_on { get; set; }
        public string email { get; set; }

    }
}
