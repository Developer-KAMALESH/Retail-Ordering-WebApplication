namespace RetailBackend.DTOs
{
    public class ProductResponseDto
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int SellerId { get; set; }
        public string SellerName { get; set; }
        public int StockQuantity { get; set; }
        public bool IsAvailable { get; set; }
        public string ImageUrl { get; set; }
    }
}
