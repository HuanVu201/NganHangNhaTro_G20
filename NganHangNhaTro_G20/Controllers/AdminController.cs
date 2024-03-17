using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Newtonsoft.Json;
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
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Index2()
        {
            return View();
        }

        //TreeView=======================================================================================
        [HttpPost]
        public JsonResult RootsTreeView()
        {

            List<Location> roots = new List<Location>();
            roots = _context.Locations.Where(a => a.ParentId.Equals("#")).OrderBy(a=> a.Name).ToList();
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
        public IActionResult listDataTable()
        {
            return View();
        }

        [HttpPost]
        public string getDataTables(string locationId)
        {
            List<House> listHouse = _context.Houses.Where(a => a.OfLocationId.Contains(locationId)).ToList();
            var value = JsonConvert.SerializeObject(new { data = listHouse });
            return value;
        }
    }
}
