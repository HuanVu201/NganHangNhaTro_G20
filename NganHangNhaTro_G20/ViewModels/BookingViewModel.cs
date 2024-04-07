namespace NganHangNhaTro_G20.ViewModels
{
    public class BookingViewModel
    {
        public Guid bookingId { get; set; }
        public string houseName { get; set; }
        public string houseAddress { get; set; }
        public string housePrice { get; set; }
        public DateTime houseCreatedAt { get; set; }
        public string houseTittle { get; set; }
    }
}
