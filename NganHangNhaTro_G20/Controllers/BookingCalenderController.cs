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
            //if (HttpContext.Session.GetString("Role") == "role1")
            //{
                return View();
            //}
            //else
            //{
            //    return RedirectToAction("UserInfo", "User");
            //}
        }


        //DataTable=====================================================================================
        [HttpGet]
        public JsonResult GetBookings()
        {
            var bookingDetails = (from bc in _context.BookingCalenders
                                  join u in _context.Users on bc.CustomerId equals u.Id
                                  join h in _context.Houses on bc.HouseId equals h.Id
                                  select new
                                  {
                                      bookingId = bc.Id,
                                      houseId = h.Id,
                                      houseType = h.HouseType,
                                      housePrice = h.Price,
                                      houseStatus = h.HouseStatus,
                                      customerId = u.Id,
                                      customerName = u.Name,
                                      customerPhone = u.PhoneNumber,
                                  }).ToList();
            return Json(new { data = bookingDetails });
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

        // Cập nhật HouseStatus=====================================================================================================
        [HttpPost]
        public async Task<int> UpdateHouseStatus([FromBody] House houseObject)
        {
            var result = -1;
            var house = await _context.Houses.FindAsync(houseObject.Id);
            if (house != null)
            {
                
                house.HouseStatus = houseObject.HouseStatus;
                _context.Update(house);
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
