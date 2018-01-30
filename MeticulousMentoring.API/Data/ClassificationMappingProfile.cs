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
    public class ClassificationMappingProfile : Profile         
    {
        public ClassificationMappingProfile()
        {
            CreateMap<Classification, ClassificationViewModel>()
                .ForMember(m => m.ClassificationId, mv => mv.MapFrom(m => m.id))
                .ForMember(m => m.ClassificationClassId, mv => mv.MapFrom(m => m.classification_id))
                .ForMember(m => m.ClassificationDescription, mv => mv.MapFrom(m => m.description))
                .ReverseMap();
        }
    }
}
