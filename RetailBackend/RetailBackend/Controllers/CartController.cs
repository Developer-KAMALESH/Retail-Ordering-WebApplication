using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace RetailBackend.Controllers
{
    [ApiController]
    [Route("api/cart")]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpPost("add")]
        public IActionResult Add(AddCartItemDto dto)
        {
            return Ok(_cartService.AddToCart(dto));
        }

        [HttpGet("{userId}")]
        public IActionResult GetCart(int userId)
        {
            return Ok(_cartService.GetCart(userId));
        }

        [HttpPut("update")]
        public IActionResult Update(UpdateCartItemDto dto)
        {
            return Ok(_cartService.UpdateCart(dto));
        }

        [HttpDelete("remove/{itemId}")]
        public IActionResult Remove(int itemId)
        {
            return Ok(_cartService.RemoveItem(itemId));
        }

        [HttpDelete("clear/{userId}")]
        public IActionResult Clear(int userId)
        {
            return Ok(_cartService.ClearCart(userId));
        }
    }
}
