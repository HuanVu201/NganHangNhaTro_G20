using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NganHangNhaTro_G20.Models;

namespace NganHangNhaTro_G20.Controllers
{
    public class AdminController : Controller
    {
        private readonly ProjectDbContext _context;

        public AdminController(ProjectDbContext context)
        {
            _context = context;
        }

        public IActionResult Index2()
        {
            if (HttpContext.Session.GetString("Role") == "role1")
            {
                return View();
            }
            else
            {
                return RedirectToAction("UserInfo", "User");
            }

        }

        //TreeView=======================================================================================
        [HttpPost]
        public JsonResult RootsTreeView()
        {

            List<Location> roots = new List<Location>();
            roots = _context.Locations.Where(a => a.ParentId.Equals("#")).OrderBy(a => a.Name).ToList();
            return Json(roots);
        }

        [HttpPost]
        public JsonResult GetTreeView(string pid)
        {
            List<Location> subNodes = new List<Location>();

            subNodes = _context.Locations.
                Where(a => a.ParentId.Equals(pid)).OrderBy(a => a.Name).ToList();

            return Json(subNodes);
        }


        //DataTable=====================================================================================
        [HttpPost]
        public string getDataTables(string locationId)
        {
            List<House> listHouse = _context.Houses.Where(a => a.OfLocationId.Contains(locationId)).ToList();
            var value = JsonConvert.SerializeObject(new { data = listHouse });
            return value;
        }


        //Thêm mới=======================================================================================
        public class HouseAndImageCategory
        {
            public House houseObject { get; set; }
            public ImageCategory imageCategoryObject { get; set; }
        }

        [HttpPost]
        public async Task<int> ThemMoi([FromBody] HouseAndImageCategory houseAndImageCategory)
        {
            var result = -1;
            try
            {
                _context.Houses.Add(houseAndImageCategory.houseObject);
                await _context.SaveChangesAsync();
                var houseId = houseAndImageCategory.houseObject.Id;
                // Tách các URL từ imageCategoryObject.Url
                var urls = houseAndImageCategory.imageCategoryObject.Url.Split(';');

                // Lưu từng URL thành một bản ghi trong cơ sở dữ liệu
                foreach (var url in urls)
                {
                    var imageCategory = new ImageCategory
                    {
                        HouseId = houseId,
                        Url = url
                    };
                    _context.ImageCategories.Add(imageCategory);
                }

                await _context.SaveChangesAsync();
                result = 1;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                result = 0;
            }
            return result;
        }



        // Chi tiết======================================================================================
        public class ListHouseAndImageCategory
        {
            public List<House> Houses { get; set; }
            public List<ImageCategory> ImageCategories { get; set; }
        }
        [HttpGet]
        public JsonResult ChiTiet(Guid houseId)
        {
            var data = new ListHouseAndImageCategory();

            data.Houses = _context.Houses.
                Where(a => a.Id.Equals(houseId)).ToList();
            data.ImageCategories = _context.ImageCategories.
                Where(a => a.HouseId.Equals(houseId)).ToList();

            return Json(data);
        }



        // Cập nhật========================================================================================
        [HttpPost]
        public async Task<int> CapNhat([FromBody] HouseAndImageCategory houseAndImageCategory)
        {
            var result = -1;

            try
            {
                _context.Houses.Update(houseAndImageCategory.houseObject);
                _context.ImageCategories.Update(houseAndImageCategory.imageCategoryObject);
                await _context.SaveChangesAsync();
                result = 1;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HouseExists(houseAndImageCategory.houseObject.Id))
                {
                    result = 0;
                }
                else
                {
                    throw;
                }
            }
            return result;
        }

        // Xóa=====================================================================================================
        [HttpPost]

        public async Task<int> DeleteConfirmed(Guid houseId)
        {
            var result = -1;
            var house = await _context.Houses.FindAsync(houseId);
            if (house != null)
            {
                _context.Houses.Remove(house);
                await _context.SaveChangesAsync();
                result = 1;
            }
            else
            {
                result = 0;
            }

            return result;
        }


        private bool HouseExists(Guid houseId)
        {
            return (_context.Houses?.Any(e => e.Id == houseId)).GetValueOrDefault();
        }

    }
}
