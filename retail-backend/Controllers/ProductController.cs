using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using retail_backend.DTOs;
using retail_backend.Models;

namespace retail_backend.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductController(AppDbContext context)
        {
            _context = context;
        }

        // GET /api/products?categoryId=1
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int? categoryId)
        {
            var query = _context.Products
                .Include(p => p.Category)
                .Include(p => p.Seller)
                .Where(p => p.IsAvailable && p.StockQuantity > 0);

            if (categoryId.HasValue && categoryId.Value > 0)
                query = query.Where(p => p.CategoryId == categoryId.Value);

            var products = await query.Select(p => new ProductResponseDto
            {
                ProductId = p.ProductId,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                CategoryId = p.CategoryId,
                CategoryName = p.Category.Name,
                SellerId = p.SellerId,
                SellerName = p.Seller.Name,
                StockQuantity = p.StockQuantity,
                IsAvailable = p.IsAvailable,
                ImageUrl = p.ImageUrl
            }).ToListAsync();

            return Ok(products);
        }

        // GET /api/products/seller?sellerId=1
        [HttpGet("seller")]
        public async Task<IActionResult> GetBySeller([FromQuery] int sellerId)
        {
            var products = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.Seller)
                .Where(p => p.SellerId == sellerId && p.IsAvailable)
                .Select(p => new ProductResponseDto
                {
                    ProductId = p.ProductId,
                    Name = p.Name,
                    Description = p.Description,
                    Price = p.Price,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category.Name,
                    SellerId = p.SellerId,
                    SellerName = p.Seller.Name,
                    StockQuantity = p.StockQuantity,
                    IsAvailable = p.IsAvailable,
                    ImageUrl = p.ImageUrl
                }).ToListAsync();

            return Ok(products);
        }

        // POST /api/products?sellerId=1
        [HttpPost]
        public async Task<IActionResult> Create([FromQuery] int sellerId, CreateProductDto dto)
        {
            var product = new Product
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                CategoryId = dto.CategoryId,
                StockQuantity = dto.StockQuantity,
                ImageUrl = dto.ImageUrl,
                SellerId = sellerId,
                IsAvailable = true
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return Ok(product);
        }

        // PUT /api/products/5?sellerId=1
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromQuery] int sellerId, UpdateProductDto dto)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();
            if (product.SellerId != sellerId) return Forbid();

            product.Name = dto.Name;
            product.Description = dto.Description;
            product.Price = dto.Price;
            product.CategoryId = dto.CategoryId;
            product.StockQuantity = dto.StockQuantity;
            product.ImageUrl = dto.ImageUrl;
            product.IsAvailable = dto.IsAvailable;

            await _context.SaveChangesAsync();
            return Ok(product);
        }

        // DELETE /api/products/5?sellerId=1
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id, [FromQuery] int sellerId)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();
            if (product.SellerId != sellerId) return Forbid();

            product.IsAvailable = false;
            await _context.SaveChangesAsync();
            return Ok("Product removed");
        }
    }
}
