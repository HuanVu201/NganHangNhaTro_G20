using Microsoft.AspNetCore.Mvc;
using NganHangNhaTro_G20.Models;

namespace NganHangNhaTro_G20.Controllers
{
    public class TestAjaxController : Controller
    {
        private readonly ProjectDbContext _dbContext;
        public TestAjaxController(ProjectDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult GetRoles()
        {
            var roles = _dbContext.Roles.ToList();
            return Json(roles);
        }
        public IActionResult GetRole(string id)
        {
            var role = _dbContext.Roles.FirstOrDefault(r => r.Id == id);

            if (role == null)
            {
                return NotFound(); // Role không tồn tại
            }

            return Json(role);
        }
    }
}
