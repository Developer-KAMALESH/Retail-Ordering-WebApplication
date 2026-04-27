using RetailBackend.Data;
using RetailBackend.DTOs;
using RetailBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace RetailBackend.Services
{
    public interface IProductService
    {
        List<Product> GetAll();
        Product GetById(int id);
        Task<string> Add(CreateProductDto dto);
        string Update(int id, UpdateProductDto dto);
        string Delete(int id);
    }
    public class ProductService : IProductService
    {
        private readonly AppDbContext _context;

        public ProductService(AppDbContext context)
        {
            _context = context;
        }

        public List<Product> GetAll()
        {
            return _context.Products.ToList();
        }

        public Product GetById(int id)
        {
            return _context.Products.Find(id);
        }

        public async Task<string> Add(CreateProductDto dto)
        {
            var product = new Product
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                CategoryId = dto.CategoryId,
                StockQuantity = 0,
                SellerId = dto.SellerId,
                IsAvailable = true,
                ImageUrl = dto.ImageUrl
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return "Product added";
        }

        public string Update(int id, UpdateProductDto dto)
        {
            var product = _context.Products.Find(id);
            if (product == null) return "Not found";

            product.Name = dto.Name;
            product.Description = dto.Description;
            product.Price = dto.Price;
            product.CategoryId = dto.CategoryId;
            product.ImageUrl = dto.ImageUrl;

            _context.SaveChanges();
            return "Updated";
        }

        public string Delete(int id)
        {
            var product = _context.Products.Find(id);
            if (product == null) return "Not found";

            _context.Products.Remove(product);
            _context.SaveChanges();

            return "Deleted";
        }
    }
}
