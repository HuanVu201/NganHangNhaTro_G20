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
            var images = _context.ImageCategories.ToList();
            var houses = _context.Houses.ToList();
            var viewHouseModel = new HouseViewModel
            {
                Houses = houses,
                Images = images
            };
            
            return Json(viewHouseModel);
        }
        public JsonResult Search(string keyword)
        {
            // Phân tách chuỗi thành các giá trị riêng lẻ
            var keywordArray = keyword.Split(',');

            // Khởi tạo các biến để lưu trữ các giá trị từ chuỗi
            var priceString = "";
            var address = "";
            var acreage = "";

            // Lặp qua từng phần tử trong mảng chuỗi
            foreach (var item in keywordArray)
            {
                // Kiểm tra nếu phần tử chứa từ "triệu"
                if (item.Contains("triệu"))
                {
                    // Lấy giá trị giá từ chuỗi
                    priceString = item.Replace(" triệu", "").Trim();
                }
                // Kiểm tra nếu phần tử chứa từ "m2"
                else if (item.Contains("m2"))
                {
                    // Lấy giá trị diện tích từ chuỗi
                    acreage = item.Replace("m2", "").Trim();
                }
                // Nếu không phải là giá trị giá hoặc diện tích, giả sử là địa chỉ
                else
                {
                    // Lấy giá trị địa chỉ từ chuỗi
                    address += item.Trim() + " ";
                }
            }

            // Tìm kiếm trong cơ sở dữ liệu
            var housesSearch = _context.Houses.Where(p =>
                (string.IsNullOrEmpty(priceString) || p.Price.Contains(priceString)) &&
                (string.IsNullOrEmpty(address) || p.Address.Contains(address.Trim())) &&
                (string.IsNullOrEmpty(acreage) || p.Acreage == int.Parse(acreage))
            ).ToList();

            // Trả về kết quả
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
            var houses = _context.Houses.ToList();

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
