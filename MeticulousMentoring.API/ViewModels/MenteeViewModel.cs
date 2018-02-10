using System;

namespace MeticulousMentoring.API.ViewModels
{
    using MeticulousMentoring.API.Data.Entities;
    using System.ComponentModel.DataAnnotations;

    public class MenteeViewModel
    {
        public int MenteeId { get; set; }

        [Required]
        public string MenteeFirstName { get; set; }

        [Required]
        public string MenteeLastName { get; set; }

        public string MenteeGender { get; set; }

        public Address MenteeAddress { get; set; }
        public School MenteeSchool { get; set; }
        public Classification MenteeClassification { get; set; }

        [Required]
        public DateTime MenteeDOB { get; set; }

        [Required]
        public string MenteeEmail { get; set; }

        public bool MenteeIsActive { get; set; }
    }
}