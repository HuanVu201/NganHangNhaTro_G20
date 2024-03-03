using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NganHangNhaTro_G20.Models
{
    public class ImageCategory
    {
        [Key]
        public Guid Id { get; set; }
        [Column(TypeName = "varchar(MAX)")]
        public string? Url { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? ModifiedAt { get; set; }
    }
}
