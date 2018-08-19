using System.Collections.Generic;

namespace MeticulousMentoring.API.ViewModels
{
    using MeticulousMentoring.API.Data.Entities;
    using System.ComponentModel.DataAnnotations;

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
        public string MentorEmail { get; set; }
        public ICollection<MenteeViewModel> MentorMentees { get; set; }
    }
}