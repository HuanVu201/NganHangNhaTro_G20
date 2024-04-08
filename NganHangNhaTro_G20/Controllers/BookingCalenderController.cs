using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using NganHangNhaTro_G20.Models;
using static NganHangNhaTro_G20.Controllers.AdminController;

namespace NganHangNhaTro_G20.Controllers
{
    public class BookingCalenderController : Controller
    {
        private readonly ProjectDbContext _context;

        public BookingCalenderController(ProjectDbContext context)
        {
            _context = context;
        }

        public IActionResult BookingCalenderView()
        {
            return View();
        }


        //DataTable=====================================================================================
        [HttpGet]
        public string GetBookings()
        {
            var bookingDetails = (from bc in _context.BookingCalenders
                                  join u in _context.Users on bc.CustomerId equals u.Id
                                  join h in _context.Houses on bc.HouseId equals h.Id
                                  select new
                                  {
                                      bookingId = bc.Id,
                                      houseType = h.HouseType,
                                      housePrice = h.Price,
                                      customerId = u.Id,
                                      customerName = u.Name,
                                      customerPhone = u.PhoneNumber,
                                  }).ToList();
            var value = JsonConvert.SerializeObject(new { data = bookingDetails });
            return value;
        }


        //Chi tiết=====================================================================================
        [HttpGet]
        public JsonResult ChiTiet(Guid bookingCalendersId)
        {
            var bookingDetails = (from bc in _context.BookingCalenders
                                  join u in _context.Users on bc.CustomerId equals u.Id
                                  join h in _context.Houses on bc.HouseId equals h.Id
                                  join l in _context.Locations on h.OfLocationId equals l.Id
                                  where bc.Id == bookingCalendersId
                                  select new
                                  {
                                      bookingId = bc.Id,
                                      bookingNote = bc.Note,

                                      customerName = u.Name,
                                      customerPhone = u.PhoneNumber,
                                      customerEmail = u.Email,

                                      houseTitle = h.HouseTitle,
                                      ownerName = h.OwnerName,
                                      ownerPhone = h.OwnerPhone,
                                      address = h.Address,
                                      acreage = h.Acreage,
                                      price = h.Price,
                                      description = h.Desciption,
                                      houseType = h.HouseType,

                                      locationName = l.Name

                                  }).ToList();

            return Json(bookingDetails);
        }

        // Xóa các phòng đang chờ xem (Hồ sơ cá nhân)=====================================================================================================
        [HttpPost]
        public async Task<int> RemoveBookingHouse(Guid bookingCalendersId, Guid customerId)
        {
            var result = -1;
            var user = await _context.Users.FindAsync(customerId);
            if (user != null)
            {
                string listBooking = user.BookingHouse;
                listBooking = listBooking.Replace($"{bookingCalendersId};", "");
                user.BookingHouse = listBooking;
                _context.Update(user);
                await _context.SaveChangesAsync();
                result = 1;
            }
            else
            {
                result = 0;
            }

            return result;
        }

        // Xóa=====================================================================================================
        [HttpPost]
        public async Task<int> DeleteConfirmed(Guid bookingCalendersId)
        {
            var result = -1;
            var bc = await _context.BookingCalenders.FindAsync(bookingCalendersId);
            if (bc != null)
            {
                _context.BookingCalenders.Remove(bc);
                await _context.SaveChangesAsync();
                result = 1;
            }
            else
            {
                result = 0;
            }

            return result;
        }

    }
}
