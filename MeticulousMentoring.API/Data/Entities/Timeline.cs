using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeticulousMentoring.API.Data.Entities
{
    public class Timeline
    {
        public int id { get; set; }
        public int user_id { get; set; }
        public string detail { get; set; }
        public DateTime timeline_date { get; set; }
    }
}