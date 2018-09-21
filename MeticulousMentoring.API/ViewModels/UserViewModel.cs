namespace MeticulousMentoring.API.ViewModels
{
    public class UserViewModel
    {
        public int id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string userName { get; set; }

        public string email { get; set; }

        public string role { get; set; }
        public int screen_status { get; set; }
        public int Mentorid { get; set; }
        public int mentee_count { get; set; }
    }
}