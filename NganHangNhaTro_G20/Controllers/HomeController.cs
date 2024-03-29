using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using NganHangNhaTro_G20.Models;
using NganHangNhaTro_G20.ViewModels;
using System.Diagnostics;
using System.Security.Cryptography;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace NganHangNhaTro_G20.Controllers
{
    public class HomeController : Controller
    {
        private readonly ProjectDbContext _context;

        public HomeController(ProjectDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }
        public JsonResult GetHouseData()
        {
            List<House> houses = new List<House>();
            houses = _context.Houses.ToList();
            return Json(houses);
        }
        public JsonResult Search(string keyword)
        {
            var housesSearch = _context.Houses.Where(p => p.Address.Contains(keyword)).ToList();
            if (housesSearch.Count == 0)
            {
                return Json(new { error = "Không tìm thấy dữ liệu!" });
            }
            else
            {
                return Json(housesSearch);
            }
        }
        public JsonResult GetLocations()
        {
            var locations = _context.Locations.ToList();
            var  houses = _context.Houses.ToList();

            var viewModel = new ViewAddress
            {
                Locations = locations,
                Houses = houses
            };

            return Json(viewModel);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
