namespace retail_backend.DTOs
{
    public class PlaceOrderDto
    {
        public string ShippingAddress { get; set; } = "";
    }

    public class OrderResponseDto
    {
        public int OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; } = "";
        public string ShippingAddress { get; set; } = "";
        public List<OrderItemResponseDto> Items { get; set; } = new();
    }

    public class OrderItemResponseDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; } = "";
        public int SellerId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
