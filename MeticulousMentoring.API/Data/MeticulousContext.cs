namespace MeticulousMentoring.API.Data
{
    using MeticulousMentoring.API.Data.Entities;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;
    using System.Text.RegularExpressions;

    /// <summary>
    /// The meticulous context.
    /// </summary>
    public class MeticulousContext : IdentityDbContext<MeticulousUser, IdentityRole<int>, int>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="MeticulousContext"/> class.
        /// </summary>
        /// <param name="options">
        /// The options.
        /// </param>
        public MeticulousContext(DbContextOptions<MeticulousContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            foreach (var entity in builder.Model.GetEntityTypes())
            {
                entity.Relational().TableName = entity.Relational().TableName.ToTrimPrefix();
            }
        }

        public DbSet<Mentee> Mentees { get; set; }
        public DbSet<Mentor> Mentors { get; set; }
        public DbSet<Guardian> Guardians { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<School> Schools { get; set; }
        public DbSet<EducationSystem> Systems { get; set; }

        public DbSet<Classification> Classifications { get; set; }
        public DbSet<GradePeriod> GradingPeriods { get; set; }
        public DbSet<Grade> Grades { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Director> Directors { get; set; }
        public DbSet<Timeline> TimeLine { get; set; }
        public DbSet<MentorProgram> Programs { get; set; }
        public DbSet<Event> Events { get; set; }
    }

    public static class StringExtensions
    {
        public static string ToTrimPrefix(this string input)
        {
            if (string.IsNullOrEmpty(input))
            {
                return input;
            }

            return Regex.Replace(input, @"^AspNet", "");
        }
    }
}