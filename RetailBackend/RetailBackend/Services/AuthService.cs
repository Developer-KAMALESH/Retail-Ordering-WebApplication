namespace RetailBackend.Services
{
    public interface IAuthService
    {
        string Register(RegisterDto dto);
        string Login(LoginDto dto);
    }
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;

        public AuthService(AppDbContext context)
        {
            _context = context;
        }

        public string Register(RegisterDto dto)
        {
            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                PasswordHash = dto.Password,
                Role = "Customer",
                CreatedAt = DateTime.Now
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return "User registered successfully";
        }

        public string Login(LoginDto dto)
        {
            var user = _context.Users
                .FirstOrDefault(u => u.Email == dto.Email && u.PasswordHash == dto.Password);

            if (user == null)
                return "Invalid credentials";

            // (JWT generation assumed already done in your project setup)
            return "Login successful (token generated in real setup)";
        }
    }
}
