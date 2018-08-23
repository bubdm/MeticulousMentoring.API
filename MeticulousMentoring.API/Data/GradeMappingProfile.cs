using AutoMapper;
using MeticulousMentoring.API.Data.Entities;
using MeticulousMentoring.API.ViewModels;

namespace MeticulousMentoring.API.Data
{
    public class GradeMappingProfile : Profile
    {
        public GradeMappingProfile()
        {
            CreateMap<Grade, GradeViewModel>()
                .ForMember(m => m.GradeId, mv => mv.MapFrom(m => m.id))
                .ForMember(m => m.MenteeId, mv => mv.MapFrom(m => m.mentee_id))
                .ForMember(m => m.GradeCourse, mv => mv.MapFrom(m => m.grade_course))
                .ForMember(m => m.GradePeriod, mv => mv.MapFrom(m => m.period))
                .ForMember(m => m.GradeValue, mv => mv.MapFrom(m => m.grade_value))
                .ForMember(m => m.SchoolYear, mv => mv.MapFrom(m => m.school_year))
                .ForMember(m => m.GradePoint, mv => mv.MapFrom(m => m.grade_point))
                .ReverseMap();
        }
    }
}