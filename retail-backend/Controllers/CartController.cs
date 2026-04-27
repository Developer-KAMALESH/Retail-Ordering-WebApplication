using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using retail_backend.DTOs;
using retail_backend.Models;

namespace retail_backend.Controllers
{
    [ApiController]
    [Route("api/cart")]
    public class CartController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CartController(AppDbContext context)
        {
            _context = context;
        }

        // GET /api/cart?userId=1
        [HttpGet]
        public async Task<IActionResult> GetCart([FromQuery] int userId)
        {
            var items = await _context.CartItems
                .Include(ci => ci.Cart)
                .Include(ci => ci.Product)
                .Where(ci => ci.Cart.UserId == userId)
                .Select(ci => new CartItemResponseDto
                {
                    CartItemId = ci.CartItemId,
                    ProductId = ci.ProductId,
                    ProductName = ci.Product.Name,
                    ImageUrl = ci.Product.ImageUrl,
                    Price = ci.Product.Price,
                    Quantity = ci.Quantity
                }).ToListAsync();

            return Ok(items);
        }

        // POST /api/cart/add?userId=1
        [HttpPost("add")]
        public async Task<IActionResult> Add([FromQuery] int userId, AddToCartDto dto)
        {
            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.UserId == userId);
            if (cart == null)
            {
                cart = new Cart { UserId = userId };
                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();
            }

            // If item already in cart, increase quantity
            var existing = await _context.CartItems
                .FirstOrDefaultAsync(ci => ci.CartId == cart.CartId && ci.ProductId == dto.ProductId);

            if (existing != null)
            {
                existing.Quantity += dto.Quantity;
            }
            else
            {
                _context.CartItems.Add(new CartItem
                {
                    CartId = cart.CartId,
                    ProductId = dto.ProductId,
                    Quantity = dto.Quantity
                });
            }

            await _context.SaveChangesAsync();
            return Ok("Added to cart");
        }

        // PUT /api/cart/update?userId=1
        [HttpPut("update")]
        public async Task<IActionResult> Update([FromQuery] int userId, UpdateCartItemDto dto)
        {
            var item = await _context.CartItems
                .Include(ci => ci.Cart)
                .FirstOrDefaultAsync(ci => ci.CartItemId == dto.CartItemId && ci.Cart.UserId == userId);

            if (item == null) return NotFound();

            if (dto.Quantity <= 0)
            {
                _context.CartItems.Remove(item);
            }
            else
            {
                item.Quantity = dto.Quantity;
            }

            await _context.SaveChangesAsync();
            return Ok("Cart updated");
        }

        // DELETE /api/cart/remove/5?userId=1
        [HttpDelete("remove/{cartItemId}")]
        public async Task<IActionResult> Remove(int cartItemId, [FromQuery] int userId)
        {
            var item = await _context.CartItems
                .Include(ci => ci.Cart)
                .FirstOrDefaultAsync(ci => ci.CartItemId == cartItemId && ci.Cart.UserId == userId);

            if (item == null) return NotFound();

            _context.CartItems.Remove(item);
            await _context.SaveChangesAsync();
            return Ok("Item removed");
        }

        // DELETE /api/cart/clear?userId=1
        [HttpDelete("clear")]
        public async Task<IActionResult> Clear([FromQuery] int userId)
        {
            var cart = await _context.Carts
                .Include(c => c.User)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null) return Ok("Cart already empty");

            var items = _context.CartItems.Where(ci => ci.CartId == cart.CartId);
            _context.CartItems.RemoveRange(items);
            await _context.SaveChangesAsync();
            return Ok("Cart cleared");
        }
    }
}
