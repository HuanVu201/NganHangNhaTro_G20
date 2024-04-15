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
            var house = _dbContext.Houses.FirstOrDefault(h => h.Id == id);
            if (house == null)
            {
                return NotFound();
            }
            string houseIdString = id.ToString();
            var images = _dbContext.ImageCategories
                             .Where(ic => ic.HouseId.ToString() == houseIdString)
                             .ToList();
            var userIdString = HttpContext.Session.GetString("UserId");
            Guid userId;
            bool hasBookings = false;
            if (Guid.TryParse(userIdString, out userId))
            {
                var listBookings = _dbContext.BookingCalenders.Where(ui => ui.CustomerId == userId && ui.HouseId == house.Id);
                var countListBookings = listBookings.Count();
                Console.WriteLine("Guid HouseId Booking: " + house.Id);
                Console.WriteLine("Guid CustomerId" + userIdString);
                Console.WriteLine("Count " + countListBookings);
                if (countListBookings > 0)
                {
                    hasBookings = true;

                }
                else
                {
                    hasBookings = false;
                }
            }
            var viewModel = new HouseDetailViewModel
            {
                House = house,
                Images = images,
                BookingCalender = new BookingCalender(),
                IsScheduled = hasBookings
            };

            return View(viewModel);
        }

        [HttpPost]
        public ActionResult AddNoteBookingCalender(Guid HouseId, string note)
        {
            Console.WriteLine("Guid HouseId: " + HouseId);

            if (HttpContext.Session.GetString("Username") != null)
            {
                var email = HttpContext.Session.GetString("Username");
                var user = _dbContext.Users.FirstOrDefault(u => u.Email == email);

                if (user != null)
                {
                    var customerId = user.Id;

                    var bookingCalender = new BookingCalender
                    {
                        HouseId = HouseId,
                        Note = note,
                        CreatedAt = DateTime.Now,
                        CustomerId = customerId
                    };

                    _dbContext.BookingCalenders.Add(bookingCalender);
                    _dbContext.SaveChanges();
                    TempData["SuccessMessage"] = "Đặt Phòng thành công!";
                    return RedirectToAction("HouseDetail", "House", new { id = HouseId });
                }
                else
                {
                   
                    return RedirectToAction("HouseDetail", "House", new { id = HouseId });
                }
            }
            return RedirectToAction("HouseDetail", "House", new { id = HouseId });
        }
    }
}
