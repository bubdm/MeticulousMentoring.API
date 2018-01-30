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
    public class DirectorMappingProfile : Profile
    {
        public DirectorMappingProfile()
        {
            CreateMap<Director, DirectorViewModel>()
                .ForMember(d => d.DirectorId, dv => dv.MapFrom(d => d.id))
                .ForMember(d => d.DirectorFirstName, dv => dv.MapFrom(d => d.first_name))
                .ForMember(d => d.DirectorLastName, dv => dv.MapFrom(d => d.last_name))
                .ForMember(d => d.DirectorEmail, dv => dv.MapFrom(d => d.email))
                .ReverseMap();

        }
    }
}
