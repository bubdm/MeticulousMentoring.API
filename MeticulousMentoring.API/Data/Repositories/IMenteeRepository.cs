﻿using System.Collections.Generic;
using MeticulousMentoring.API.Data.Entities;

namespace MeticulousMentoring.API.Data.Repositories
{
    public interface IMenteeRepository
    {
        IEnumerable<Mentee> GetAllMentees();
        IEnumerable<Mentee> GetTotalMentees(); 
        Mentee GetMenteeById(int id);
        Mentor GetMentorByMenteeId(int id);
        bool SaveAll();

        void AddMentee(object model);
    }
}