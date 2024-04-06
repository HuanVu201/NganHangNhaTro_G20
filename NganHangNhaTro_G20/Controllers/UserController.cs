using Microsoft.AspNetCore.Mvc;

namespace NganHangNhaTro_G20.Controllers
{
    public class UserController : Controller
    {
        
        public IActionResult Index()
        {
           
            return View();
        }
        public IActionResult UserInfo()
        { 
            return View();
        }
        public IActionResult UserInfoHouseBooking()
        {
            return View();
        }
    }
}
