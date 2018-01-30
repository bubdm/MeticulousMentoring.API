using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeticulousMentoring.API.Data.Entities
{
    using System.Net.Sockets;

    public class School
    {
        public int id { get; set; }
        public string school_name { get; set; }
        public Address address { get; set; }
        public string principal { get; set; }
        public EducationSystem system { get; set; }
        public DateTime? created_on { get; set; }
        public DateTime? modified_on { get; set; }
       
    }
}
