namespace RetailBackend.Services
{
    public interface IProductService
    {
        List<Product> GetAll();
        Product GetById(int id);
        string Add(ProductDto dto);
        string Update(int id, ProductDto dto);
        string Delete(int id);
    }
    public class ProductService
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

        public string Add(ProductDto dto)
        {
            var product = new Product
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                CategoryId = dto.CategoryId,
                StockQuantity = 0,
                IsAvailable = true,
                ImageUrl = dto.ImageUrl
            };

            _context.Products.Add(product);
            _context.SaveChanges();

            return "Product added";
        }

        public string Update(int id, ProductDto dto)
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
