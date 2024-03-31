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
            if (HttpContext.Session.GetString("Username") == null)
            {
                return RedirectToAction("Login", "Access"); 
            }
            //var ids = new List<Guid>
            //    {
            //        new Guid("06C7A0DA-856A-4D3D-8531-771E11225EFF"),
            //        new Guid("8CD40FBF-04A2-4F89-B4B1-D26821F3F54F")
            //    };
            //var house = _dbContext.Houses.FirstOrDefault(h => h.Id == id);
            //var images = _dbContext.ImageCategories
            //    .Where(ic => ids.Contains(ic.Id))
            //    .ToList();
            //Console.WriteLine(images.Count);
            //if (house == null)
            //{
            //    return NotFound();
            //}
            //var viewModel = new HouseDetailViewModel
            //{
            //    House = house,
            //    Images = images
            //};
            //return View(viewModel);
            return null;
        }
    }
}
