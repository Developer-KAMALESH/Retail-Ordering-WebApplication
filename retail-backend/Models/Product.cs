namespace retail_backend.Models
{
    public class Product
    {
        public int ProductId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public int CategoryId { get; set; }

        // ✅ Navigation (MUST be this type)
        public Category Category { get; set; }

        public int SellerId { get; set; }

        public User Seller { get; set; }

        public int StockQuantity { get; set; }

        public bool IsAvailable { get; set; } = true;

        public string ImageUrl { get; set; }
    }
}
