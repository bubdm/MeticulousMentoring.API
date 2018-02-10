using AutoMapper;
using MeticulousMentoring.API.Data.Entities;
using MeticulousMentoring.API.ViewModels;

namespace MeticulousMentoring.API.Data
{
    public class GuardianMappingProfile : Profile
    {
        public GuardianMappingProfile()
        {
            CreateMap<Guardian, GuardianViewModel>()
                .ForMember(m => m.GuardianId, mv => mv.MapFrom(m => m.id))
                .ForMember(m => m.GuardianFirstName, mv => mv.MapFrom(m => m.first_name))
                .ForMember(m => m.GuardianLastName, mv => mv.MapFrom(m => m.last_name))
                .ForMember(m => m.GuardianAddress, mv => mv.MapFrom(m => m.address))
                .ForMember(m => m.GuardianGender, mv => mv.MapFrom(m => m.gender))
                .ForMember(m => m.GuardianChildren, mv => mv.MapFrom(m => m.children))
                .ForMember(m => m.GuardianEmail, mv => mv.MapFrom(m => m.email))
                .ReverseMap();
        }
    }
}