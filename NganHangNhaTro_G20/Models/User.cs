using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NganHangNhaTro_G20.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }
        [Column(TypeName = "nvarchar(200)")]
        public string Name { get; set; }
        [Column(TypeName = "varchar(15)")]
        public string PhoneNumber { get; set; }
        [Column(TypeName = "varchar(100)")]
        public string? Email { get; set; }
        public int? Gender { get; set; }
        [Column(TypeName = "varchar(1000)")]
        public string Password { get; set; }
        [Column(TypeName = "varchar(MAX)")]
        public string? OwnershipHouse { get; set; }
        [Column(TypeName = "varchar(MAX)")]
        public string? BookingHouse { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? ModifiedAt { get; set; }
        public virtual Role Role { get; set; }

    }
}
