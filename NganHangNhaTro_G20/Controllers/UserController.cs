﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NganHangNhaTro_G20.Models;
using NganHangNhaTro_G20.ViewModels;

namespace NganHangNhaTro_G20.Controllers
{
    public class UserController : Controller
    {
        private readonly ProjectDbContext _dbContext;
        public UserController(ProjectDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IActionResult Index()
        {
            return View();
        }
        public IActionResult UserInfo()
        {
            if (HttpContext.Session.GetString("Username") != null)
            {
                var email = HttpContext.Session.GetString("Username");
                User user = new User();
                user = _dbContext.Users.FirstOrDefault(u => u.Email == email);
                if (user != null)
                {
                    return View(user);
                }
            }
            return RedirectToAction("Index", "Home");
        }
        public IActionResult UserInfoHouseBooking()
        {
            if (HttpContext.Session.GetString("Username") != null)
            {
                User user = new User();
                List<House> houses = new List<House>();
                List<BookingCalender> bookingCalenders = new List<BookingCalender>();
                List<BookingViewModel> bookingViewModels = new List<BookingViewModel>();
                var email = HttpContext.Session.GetString("Username");
                user = _dbContext.Users.FirstOrDefault(u => u.Email == email);
                if (user != null)
                {
                    bookingCalenders = _dbContext.BookingCalenders.Where(b => b.CustomerId == user.Id).ToList();
                    foreach (var bookingCalender in bookingCalenders)
                    {
                        House house = _dbContext.Houses.FirstOrDefault(h => h.Id == bookingCalender.HouseId);
                        if (house != null)
                        {
                            BookingViewModel bookingViewModel = new BookingViewModel();
                            bookingViewModel.bookingId = bookingCalender.Id;
                            bookingViewModel.housePrice = house.Price;
                            bookingViewModel.houseName = house.HouseTitle;
                            bookingViewModel.houseTittle = bookingCalender.Note;
                            bookingViewModel.houseCreatedAt = house.CreatedAt ?? DateTime.MinValue;
                            bookingViewModel.houseAddress = house.Address;
                            bookingViewModels.Add(bookingViewModel);
                        }
                    }
                    UserInfoHouseBookingViewModel userInfoHouseBookingViewModel = new UserInfoHouseBookingViewModel
                    {
                        user = user,
                        bookingList = bookingViewModels
                    };
                    return View(userInfoHouseBookingViewModel);
                }
            }
            return RedirectToAction("Index", "Home");
        }
        public IActionResult DeleteBooking(Guid bookingId)
        {
            if (HttpContext.Session.GetString("Username") != null)
            {
                var email = HttpContext.Session.GetString("Username");
                var user = _dbContext.Users.FirstOrDefault(u => u.Email == email);
                if (user != null)
                {
                    var booking = _dbContext.BookingCalenders.FirstOrDefault(b => b.Id == bookingId && b.CustomerId == user.Id);
                    if (booking != null)
                    {
                        _dbContext.BookingCalenders.Remove(booking);
                        _dbContext.SaveChanges();
                        return RedirectToAction("UserInfoHouseBooking");
                    }
                }
            }
            return RedirectToAction("Index", "Home");
        }
    }
}