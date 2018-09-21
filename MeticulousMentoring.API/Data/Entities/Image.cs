using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeticulousMentoring.API.Data.Entities
{
    public class Image
    {
        public int id { get; set; }
        public int user_id { get; set; }
        public string filename { get; set; }
        public string content_type { get; set; }
        public byte[] data { get; set; }
    }
}