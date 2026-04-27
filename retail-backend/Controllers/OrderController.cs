using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using retail_backend.DTOs;
using retail_backend.Models;

namespace retail_backend.Controllers
{
    [ApiController]
    [Route("api/orders")]
    public class OrderController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrderController(AppDbContext context)
        {
            _context = context;
        }

        // POST /api/orders?userId=1
        [HttpPost]
        public async Task<IActionResult> PlaceOrder([FromQuery] int userId, PlaceOrderDto dto)
        {
            var cartItems = await _context.CartItems
                .Include(ci => ci.Cart)
                .Include(ci => ci.Product)
                .Where(ci => ci.Cart.UserId == userId)
                .ToListAsync();

            if (!cartItems.Any())
                return BadRequest("Cart is empty");

            // Validate stock first
            foreach (var item in cartItems)
            {
                if (item.Product.StockQuantity < item.Quantity)
                    return BadRequest($"Insufficient stock for {item.Product.Name}");
            }

            var order = new Order
            {
                UserId = userId,
                OrderDate = DateTime.UtcNow,
                Status = "Confirmed",
                ShippingAddress = dto.ShippingAddress,
                TotalAmount = 0
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            var orderItems = new List<OrderItem>();

            foreach (var item in cartItems)
            {
                item.Product.StockQuantity -= item.Quantity;
                order.TotalAmount += item.Quantity * item.Product.Price;

                orderItems.Add(new OrderItem
                {
                    OrderId = order.OrderId,
                    ProductId = item.ProductId,
                    SellerId = item.Product.SellerId,
                    Quantity = item.Quantity,
                    Price = item.Product.Price
                });
            }

            _context.OrderItems.AddRange(orderItems);
            _context.CartItems.RemoveRange(cartItems);
            await _context.SaveChangesAsync();

            return Ok(new OrderResponseDto
            {
                OrderId = order.OrderId,
                OrderDate = order.OrderDate,
                TotalAmount = order.TotalAmount,
                Status = order.Status,
                ShippingAddress = order.ShippingAddress,
                Items = orderItems.Select(oi => new OrderItemResponseDto
                {
                    ProductId = oi.ProductId,
                    ProductName = cartItems.First(ci => ci.ProductId == oi.ProductId).Product.Name,
                    SellerId = oi.SellerId,
                    Quantity = oi.Quantity,
                    Price = oi.Price
                }).ToList()
            });
        }

        // GET /api/orders?userId=1
        [HttpGet]
        public async Task<IActionResult> GetOrders([FromQuery] int userId)
        {
            var orders = await _context.Orders
                .Where(o => o.UserId == userId)
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();

            var result = new List<OrderResponseDto>();

            foreach (var order in orders)
            {
                var items = await _context.OrderItems
                    .Include(oi => oi.Product)
                    .Where(oi => oi.OrderId == order.OrderId)
                    .Select(oi => new OrderItemResponseDto
                    {
                        ProductId = oi.ProductId,
                        ProductName = oi.Product.Name,
                        SellerId = oi.SellerId,
                        Quantity = oi.Quantity,
                        Price = oi.Price
                    }).ToListAsync();

                result.Add(new OrderResponseDto
                {
                    OrderId = order.OrderId,
                    OrderDate = order.OrderDate,
                    TotalAmount = order.TotalAmount,
                    Status = order.Status,
                    ShippingAddress = order.ShippingAddress,
                    Items = items
                });
            }

            return Ok(result);
        }

        // PUT /api/orders/5/cancel
        [HttpPut("{id}/cancel")]
        public async Task<IActionResult> Cancel(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return NotFound();
            if (order.Status == "Cancelled") return BadRequest("Already cancelled");

            var items = await _context.OrderItems
                .Include(oi => oi.Product)
                .Where(oi => oi.OrderId == id)
                .ToListAsync();

            foreach (var item in items)
                item.Product.StockQuantity += item.Quantity;

            order.Status = "Cancelled";
            await _context.SaveChangesAsync();
            return Ok("Order cancelled");
        }
    }
}
