namespace retail_backend.Models
{
    public class OrderItem
    {
        public int OrderItemId { get; set; }

        public int OrderId { get; set; }

        public Order Order { get; set; }

        public int ProductId { get; set; }

        public Product Product { get; set; }

        public int SellerId { get; set; }

        public User Seller { get; set; }

        public int Quantity { get; set; }

        public decimal Price { get; set; }
    }
}
