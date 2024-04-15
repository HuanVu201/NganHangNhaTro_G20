using Microsoft.AspNetCore.Mvc;
using NganHangNhaTro_G20.Models;

namespace NganHangNhaTro_G20.Controllers
{
    public class AccessController : Controller
    {
        private readonly ProjectDbContext _dbContext;
        public AccessController(ProjectDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpPost]
        public IActionResult Login(User model)
        {
           
            var user = _dbContext.Users.FirstOrDefault(u => u.Email == model.Email && u.Password == model.Password);
            if (user != null)
            {
                HttpContext.Session.SetString("Username", model.Email.ToString());
                HttpContext.Session.SetString("NameLogined", user.Name);
                HttpContext.Session.SetString("Role", user.RoleId);
                HttpContext.Session.SetString("UserId", user.Id.ToString());
                Console.WriteLine("Session Username: " + HttpContext.Session.GetString("Username"));
                Console.WriteLine("Name: " +  user.Name);
                return RedirectToAction("Index", "Home");
            }
            else
            {
                var error = "Tên đăng nhập hoặc mật khẩu không chính xác!";
                ViewBag.error = error;
            }
            return View();
        }
        [HttpGet]
        public IActionResult Login()
        {
            if (HttpContext.Session.GetString("Username") != null)
            {
                return RedirectToAction("Index", "Home");
            }
            return View();
        }

        [HttpPost]
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Login", "Access");
        }

        [HttpPost]
        public IActionResult Register(User model)
        {
            bool emailExists = _dbContext.Users.Any(u => u.Email == model.Email);
            if (emailExists)
            {
                ModelState.AddModelError("Email", "Địa chỉ Email đã tồn tại");
                return View(model);
            }
            model.RoleId = "role2";
            _dbContext.Users.Add(model);
            _dbContext.SaveChanges();
            LoginUser(model.Email, model.Password);

            return RedirectToAction("Index", "Home");
        }

        private void LoginUser(string email, string password)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Email == email && u.Password == password);
            if (user != null)
            {
                HttpContext.Session.SetString("Username", email);
                HttpContext.Session.SetString("NameLogined", user.Name);
                HttpContext.Session.SetString("Role", user.RoleId);
                HttpContext.Session.SetString("UserId", user.Id.ToString());
                Console.WriteLine("Session Username: " + HttpContext.Session.GetString("Username"));
                Console.WriteLine("Name: " + user.Name);
            }
        }

        [HttpGet]
        public IActionResult Register()
        {
            return View();
        }
    }
}
