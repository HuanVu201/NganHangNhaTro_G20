using Microsoft.EntityFrameworkCore;

namespace NganHangNhaTro_G20.Models
{
    public class ProjectDbContext : DbContext
    {

        public ProjectDbContext(DbContextOptions options) : base(options)
        {
        }

        public virtual DbSet<House> Houses { get; set; }
        public virtual DbSet<ImageCategory> ImageCategories { get; set; }
        public virtual DbSet<BookingCalender> BookingCalenders { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Location> Locations { get; set; }
    }
}
