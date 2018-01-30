using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using MeticulousMentoring.API.Data.Entities;
using MeticulousMentoring.API.ViewModels;

namespace MeticulousMentoring.API.Data
{
    public class SchoolMappingProfile : Profile
    {
        public SchoolMappingProfile()
        {
            CreateMap<School, SchoolViewModel>()
                .ForMember(m => m.SchoolId, mv => mv.MapFrom(m => m.id))
                .ForMember(m => m.SchoolAddress, mv => mv.MapFrom(m => m.address))
                .ForMember(m => m.SchoolName, mv => mv.MapFrom(m => m.school_name))
                .ForMember(m => m.SchoolSystem, mv => mv.MapFrom(m => m.system))
                .ForMember(m => m.SchoolPrincipal, mv => mv.MapFrom(m => m.principal))
                .ReverseMap();
        }
    }
}
