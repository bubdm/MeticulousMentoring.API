using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeticulousMentoring.API.ViewModels
{
    using System.ComponentModel.DataAnnotations;

    using MeticulousMentoring.API.Data.Entities;

    public class MentorViewModel
    {
        public int MentorId { get; set; }
        [Required]
        public string MentorFirstName { get; set; }
        [Required]
        public string MentorLastName { get; set; }
        public string MentorGender { get; set; }
        public Address MentorAddress { get; set; }
        public bool MentorIsActive { get; set; }
        public ICollection<MenteeViewModel> MentorMentees { get; set; }
    }
}
