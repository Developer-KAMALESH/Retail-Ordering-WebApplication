namespace RetailBackend.Services
{
    public interface ICartService
    {
        string AddToCart(AddCartItemDto dto);
        Cart GetCart(int userId);
        string UpdateCart(UpdateCartItemDto dto);
        string RemoveItem(int itemId);
        string ClearCart(int userId);
    }
    public class CartService
    {
        private readonly AppDbContext _context;

        public CartService(AppDbContext context)
        {
            _context = context;
        }

        public string AddToCart(AddCartItemDto dto)
        {
            var cart = _context.Carts.FirstOrDefault(c => c.UserId == dto.UserId);

            if (cart == null)
            {
                cart = new Cart { UserId = dto.UserId };
                _context.Carts.Add(cart);
                _context.SaveChanges();
            }

            var item = new CartItem
            {
                CartId = cart.CartId,
                ProductId = dto.ProductId,
                Quantity = dto.Quantity
            };

            _context.CartItems.Add(item);
            _context.SaveChanges();

            return "Added to cart";
        }

        public Cart GetCart(int userId)
        {
            return _context.Carts.FirstOrDefault(c => c.UserId == userId);
        }

        public string UpdateCart(UpdateCartItemDto dto)
        {
            var item = _context.CartItems.Find(dto.CartItemId);
            if (item == null) return "Not found";

            item.Quantity = dto.Quantity;
            _context.SaveChanges();

            return "Updated";
        }

        public string RemoveItem(int itemId)
        {
            var item = _context.CartItems.Find(itemId);
            if (item == null) return "Not found";

            _context.CartItems.Remove(item);
            _context.SaveChanges();

            return "Removed";
        }

        public string ClearCart(int userId)
        {
            var cart = _context.Carts.FirstOrDefault(c => c.UserId == userId);

            if (cart == null) return "Cart not found";

            var items = _context.CartItems.Where(i => i.CartId == cart.CartId).ToList();

            _context.CartItems.RemoveRange(items);
            _context.SaveChanges();

            return "Cart cleared";
        }
    }
}
