using MeticulousMentoring.API.Data.Entities;
using System.Collections.Generic;

namespace MeticulousMentoring.API.ViewModels
{
    public class GuardianViewModel
    {
        public int GuardianId { get; set; }
        public string GuardianFirstName { get; set; }
        public string GuardianLastName { get; set; }
        public string GuardianGender { get; set; }
        public Address GuardianAddress { get; set; }
        public string GuardianEmail { get; set; }

        public ICollection<Mentee> GuardianChildren { get; set; }
    }
}