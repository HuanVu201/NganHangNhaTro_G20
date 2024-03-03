using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NganHangNhaTro_G20.Models
{
    public class HouseType
    {
        [Key]
        [Column(TypeName = "varchar(20)")]
        public string Id { get; set; }
        [Column(TypeName = "nvarchar(200)")]
        public string Name { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? ModifiedAt { get; set; }
    }
}
