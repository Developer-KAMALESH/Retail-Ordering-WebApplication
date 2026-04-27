namespace RetailBackend.Services
{
    public interface IOrderService
    {
        string PlaceOrder(PlaceOrderDto dto);
        List<Order> GetUserOrders();
        List<Order> GetAllOrders();
        string UpdateStatus(int orderId, string status);
    }
    public class OrderService
    {
        private readonly AppDbContext _context;

        public OrderService(AppDbContext context)
        {
            _context = context;
        }

        public string PlaceOrder(PlaceOrderDto dto)
        {
            var cart = _context.Carts.FirstOrDefault();

            var cartItems = _context.CartItems
                .Where(c => c.CartId == cart.CartId)
                .ToList();

            var order = new Order
            {
                UserId = cart.UserId,
                OrderDate = DateTime.Now,
                Status = "Pending",
                TotalAmount = 0,
                ShippingAddress = dto.ShippingAddress
            };

            _context.Orders.Add(order);
            _context.SaveChanges();

            decimal total = 0;

            foreach (var item in cartItems)
            {
                var product = _context.Products.Find(item.ProductId);

                var orderItem = new OrderItem
                {
                    OrderId = order.OrderId,
                    ProductId = item.ProductId,
                    SellerId = product.SellerId,
                    Quantity = item.Quantity,
                    Price = product.Price
                };

                total += product.Price * item.Quantity;

                product.StockQuantity -= item.Quantity;

                _context.OrderItems.Add(orderItem);
            }

            order.TotalAmount = total;

            _context.CartItems.RemoveRange(cartItems);
            _context.SaveChanges();

            return "Order placed successfully";
        }

        public List<Order> GetUserOrders()
        {
            return _context.Orders.ToList();
        }

        public List<Order> GetAllOrders()
        {
            return _context.Orders.ToList();
        }

        public string UpdateStatus(int orderId, string status)
        {
            var order = _context.Orders.Find(orderId);
            if (order == null) return "Not found";

            order.Status = status;
            _context.SaveChanges();

            return "Status updated";
        }
    }
}
