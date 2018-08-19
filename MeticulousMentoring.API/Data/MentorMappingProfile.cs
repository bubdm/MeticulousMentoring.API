namespace MeticulousMentoring.API.Data
{
    using AutoMapper;

    using MeticulousMentoring.API.Data.Entities;
    using MeticulousMentoring.API.ViewModels;

    public class MentorMappingProfile : Profile
    {
        public MentorMappingProfile()
        {
            CreateMap<Mentor, MentorViewModel>()
                .ForMember(m => m.MentorId, mv => mv.MapFrom(m => m.id))
                .ForMember(m => m.MentorFirstName, mv => mv.MapFrom(m => m.first_name))
                .ForMember(m => m.MentorLastName, mv => mv.MapFrom(m => m.last_name))
                .ForMember(m => m.MentorGender, mv => mv.MapFrom(m => m.gender))
                .ForMember(m => m.MentorAddress, mv => mv.MapFrom(m => m.address))
                .ForMember(m => m.MentorIsActive, mv => mv.MapFrom(m => m.is_active))
                .ForMember(m => m.MentorMentees, mv => mv.MapFrom(m => m.mentees))
                .ForMember(m => m.MentorEmail, mv => mv.MapFrom(m => m.email))
                .ReverseMap();
        }
    }
}