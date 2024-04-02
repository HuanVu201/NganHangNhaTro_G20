using Microsoft.AspNetCore.Mvc;
using NganHangNhaTro_G20.Models;

namespace NganHangNhaTro_G20.Controllers
{
    public class HouseController : Controller
    {
        private readonly ProjectDbContext _dbContext;
        public HouseController(ProjectDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IActionResult HouseDetail(Guid id)
        {
           // if (HttpContext.Session.GetString("Username") == null)
            //{
             //   return RedirectToAction("Login", "Access");
            //}

            var house = _dbContext.Houses.FirstOrDefault(h => h.Id == id);
            if (house == null)
            {
                return NotFound();
            }
            string houseIdString = id.ToString();
            var images = _dbContext.ImageCategories
                             .Where(ic => ic.HouseId == houseIdString)
                             .ToList();

            var viewModel = new HouseDetailViewModel
            {
                House = house,
                Images = images,
                BookingCalender = new BookingCalender() // Khởi tạo BookingCalender mới
            };

            return View(viewModel);
        }
        [HttpPost]
        public IActionResult AddNoteBookingCalender(Guid id, string note)
        {
            var bookingCalender = new BookingCalender
            {
                HouseId = id,
                Note = note,
                CreatedAt = DateTime.Now
            };
            _dbContext.BookingCalenders.Add(bookingCalender);
            _dbContext.SaveChanges();
            return RedirectToAction("HouseDetail", "House", new { id });
        }

    }
}
