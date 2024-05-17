using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NganHangNhaTro_G20.Models;
using static NganHangNhaTro_G20.Controllers.AdminController;

namespace NganHangNhaTro_G20.Controllers
{
    public class AdminController : Controller
    {
        private readonly ProjectDbContext _context;

        public AdminController(ProjectDbContext context)
        {
            _context = context;
        }

        public IActionResult HouseManage()
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
             
                var houseId = houseAndImageCategory.houseObject.Id;

                var urls = houseAndImageCategory.imageCategoryObject.Url;
                if(urls.EndsWith(";")){
                    urls = urls.Remove(urls.Length -1);
                }

                foreach (var url in urls.Split(';'))
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
                var imageCategoriesToDelete = _context.ImageCategories.Where(ic => ic.HouseId == houseAndImageCategory.houseObject.Id);
                _context.ImageCategories.RemoveRange(imageCategoriesToDelete);

                var houseId = houseAndImageCategory.houseObject.Id;

                var urls = houseAndImageCategory.imageCategoryObject.Url;
                if (urls.EndsWith(";"))
                {
                    urls = urls.Remove(urls.Length - 1);
                }

                foreach (var url in urls.Split(';'))
                {
                    var imageCategory = new ImageCategory
                    {
                        HouseId = houseId,
                        Url = url
                    };
                    _context.ImageCategories.Add(imageCategory);
                }

                //_context.ImageCategories.Update(houseAndImageCategory.imageCategoryObject);
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
                var imageCategoriesToDelete = _context.ImageCategories.Where(ic => ic.HouseId == houseId);
                _context.ImageCategories.RemoveRange(imageCategoriesToDelete);
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

// Câu hỏi thi
// 1. Chọn một bảng của một sản phẩm/dịch vụ/người dùng mà bạn phụ trách. Tạo một view mới hiển thị tất cả các trường thông tin của các bản ghi: 
//      + Đối với desktop thì hiển thị 3 bản ghi trên một hàng
//      + Mobile thì 1 bản ghi trên 1 hàng
// 2. Thêm trường VerifyKey cho bảng vừa chọn có kiểu dữ liệu string, yêu cầu phải có 10 kí tự và bắt đầu bằng chữ số trong Model
// 3. Thêm/Thay đổi một chức năng để có thể thêm dữ liệu cho trường VerifyKey này. Hiển thị dữ liệu VerifyKey trên các bản ghi của view vừa tạo
// 4. Đánh giá công tác làm việc nhóm     