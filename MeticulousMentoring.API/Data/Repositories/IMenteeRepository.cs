﻿using MeticulousMentoring.API.Data.Entities;
using System.Collections.Generic;

namespace MeticulousMentoring.API.Data.Repositories
{
    public interface IMenteeRepository
    {
        IEnumerable<Mentee> GetAllMentees();

        IEnumerable<Mentee> GetTotalMentees();

        Mentee GetMenteeById(int id);

        Mentor GetMentorByMenteeId(int id);

        Guardian GetGuardianByMenteeId(int id);

        bool SaveAll();

        IEnumerable<SiteAverage> GetAllAveragesForUser(int classification_id, string school_year);

        IEnumerable<Grade> GetMenteeGrades(int id);

        void AddMentee(object model);

        void SaveMenteeGrades(IEnumerable<GradesDto> grades);

        IEnumerable<GradePointAverage> GetGradePointAverages(int mentee_id);

        decimal GetGradePointAverage(int mentee_id, int period_id);
    }
}