

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NganHangNhaTro_G20.Models
{
    public class House
    {
        [Key]
        public Guid Id { get; set; }
        [Column(TypeName = "nvarchar(1000)")]
        public string Address { get; set; }
        public int Acreage { get; set; }
        [Column(TypeName = "float")]
        public float Price { get; set; }
        [Column(TypeName = "nvarchar(MAX)")]
        public string Desciption { get; set; }
        [Column(TypeName = "float")]
        public float? Rate { get; set; }
        //[Column(TypeName = "varchar(20)")]
        //public string StatusId { get; set; }
        //[Column(TypeName = "varchar(20)")]
        //public string TypeId { get; set; }
        //public Guid OwnerId { get; set; }
        //public Guid? ImageCategoryId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? ModifiedAt { get; set; }
        public virtual HouseStatus HouseStatus { get; set; }
        public virtual HouseType HouseType { get; set; }
        public virtual User Owner { get; set; }
        public virtual User UserPosted { get; set; }
        public virtual ImageCategory ImageCategory { get; set; }

    }
}
