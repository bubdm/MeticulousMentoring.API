using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeticulousMentoring.API.Data
{
    using AutoMapper;

    using MeticulousMentoring.API.Data.Entities;
    using MeticulousMentoring.API.ViewModels;

    public class MenteeMappingProfile : Profile
    {
        public MenteeMappingProfile()
        {
            CreateMap<Mentee, MenteeViewModel>()
                .ForMember(m => m.MenteeId, mv => mv.MapFrom(m => m.id))
                .ForMember(m => m.MenteeFirstName, mv => mv.MapFrom(m => m.first_name))
                .ForMember(m => m.MenteeLastName, mv => mv.MapFrom(m => m.last_name))
                .ForMember(m => m.MenteeClassification, mv => mv.MapFrom(m => m.classification))
                .ForMember(m => m.MenteeSchool, mv => mv.MapFrom(m => m.school))
                .ForMember(m => m.MenteeDOB, mv => mv.MapFrom(m => m.dob))
                .ForMember(m => m.MenteeEmail, mv => mv.MapFrom(m => m.email))
                .ForMember(m => m.MenteeGender, mv => mv.MapFrom(m => m.gender))
                .ForMember(m => m.MenteeAddress, mv => mv.MapFrom(m => m.address))
                .ForMember(m => m.MenteeIsActive, mv => mv.MapFrom(m => m.is_active))
                .ReverseMap();
        }
    }
}
