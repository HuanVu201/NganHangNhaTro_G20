using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NganHangNhaTro_G20.Models
{
    public class Vote
    {
        [Key]
        public Guid Id { get; set; }
        public Guid HouseId { get; set; }
        public Guid CustomerId { get; set; }
        public int StarVote { get; set; }
        [Column(TypeName = "nvarchar(MAX)")]
        public string? Comment { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? ModifiedAt { get; set; }
        //public virtual House House { get; set; }
        //public virtual User Customer { get; set; }
    }
}
