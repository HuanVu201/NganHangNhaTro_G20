using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NganHangNhaTro_G20.Models
{
    public class Location
    {
        [Key]
        [Column(TypeName = "varchar(20)")]
        public string Id { get; set; }
        [Column(TypeName = "nvarchar(1000)")]
        public string Name { get; set; }
        public string? ParentId { get; set; }
    }
}
