using System.Collections.Generic;
using MeticulousMentoring.API.Data.Entities;

namespace MeticulousMentoring.API.Data.Repositories
{
    public interface IMentorRepository
    {
        IEnumerable<Mentor> GetAllMentors(bool includeMentees);

        Mentor GetMentorById(int id);

        bool SaveAll();

        void AddMentor(object model);
    }
}