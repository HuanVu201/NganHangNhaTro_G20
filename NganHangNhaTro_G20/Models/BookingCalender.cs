using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NganHangNhaTro_G20.Models
{
    public class BookingCalender
    {
        [Key]
        public Guid Id { get; set; }
        public Guid CustomerId { get; set; }
        public Guid HouseId { get; set; }
        public Guid? SupervisorId { get; set; }

        [Column(TypeName = "nvarchar(2000)")]
        public string? Note { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? ModifiedAt { get; set; }
        //public virtual User Customer { get; set; }
        //public virtual User Supervisor { get; set; }
        //public virtual House House { get; set; }
    }
}
