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
    public class EducationSystemMappingProfile : Profile        
    {
        public EducationSystemMappingProfile()
        {
            CreateMap<EducationSystem, EducationSystemViewModel>()
                .ForMember(m => m.EducationSystemId, mv => mv.MapFrom(m => m.id))
                .ForMember(m => m.EducationSystemName, mv => mv.MapFrom(m => m.system))
                .ReverseMap();
        }
    }
}
