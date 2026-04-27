namespace RetailBackend.DTOs
{
    public class OrderResponseDto
    {
        public int OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; }
        public string ShippingAddress { get; set; }
        public List<OrderItemResponseDto> Items { get; set; }
    }
}
