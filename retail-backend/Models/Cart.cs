namespace retail_backend.Models
{
    public class Cart
    {
        public int CartId { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }
    }
}
