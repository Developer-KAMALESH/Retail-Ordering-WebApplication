namespace RetailBackend.DTOs
{
    public class RegisterDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }   // Customer / Seller
        public string? StoreName { get; set; } // Only for Seller
    }
}
