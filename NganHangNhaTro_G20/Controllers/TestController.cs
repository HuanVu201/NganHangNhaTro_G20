using Microsoft.AspNetCore.Mvc;
using NganHangNhaTro_G20.Models;

namespace NganHangNhaTro_G20.Controllers
{
    public class TestController : Controller
    {
        private readonly ProjectDbContext _dbContext;
        public TestController(ProjectDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public IActionResult Index()
        {
            var listRoles = _dbContext.Roles.ToList();
            return View(listRoles);
        }

        public IActionResult Edit(string id)
        {
            var role = _dbContext.Roles.Find(id);
            return View(role);
        }

        [HttpPost]
        public IActionResult Edit(Role role)
        {
            if (role != null)
            {
                _dbContext.Roles.Update(role);
                _dbContext.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(role);
        }

        public IActionResult Delete(string id)
        {
            var role = _dbContext.Roles.Find(id);
            return View(role);
        }
        [HttpPost]
        public IActionResult DeleteConfirmed(string id)
        {
            var role = _dbContext.Roles.Find(id);
            _dbContext.Roles.Remove(role);
            _dbContext.SaveChanges();
            return RedirectToAction("Index");
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(Role role)
        {
            _dbContext.Roles.Add(role);
            _dbContext.SaveChanges();
            return RedirectToAction("Index");
        }

    }
}
