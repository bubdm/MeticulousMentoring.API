namespace MeticulousMentoring.API.Data.Repositories
{
    public interface IDirectorRepository
    {
        void AddDirector(object model);

        bool SaveAll();
    }
}