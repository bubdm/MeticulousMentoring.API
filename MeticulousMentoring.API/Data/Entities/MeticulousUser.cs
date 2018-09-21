namespace MeticulousMentoring.API.Data.Entities
{
    using Microsoft.AspNetCore.Identity;

    public class MeticulousUser : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int screen_status { get; set; }
    }
}