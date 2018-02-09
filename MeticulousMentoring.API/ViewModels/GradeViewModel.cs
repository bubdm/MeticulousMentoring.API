using MeticulousMentoring.API.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeticulousMentoring.API.ViewModels
{
    public class GradeViewModel
    {
        public int GradeId { get; set; }
        public int MenteeId { get; set; }
        public Course GradeCourse { get; set; }
        public GradePeriod GradePeriod { get; set; }
        public decimal GradeValue { get; set; }
        public string SchoolYear { get; set; }

       }
}
