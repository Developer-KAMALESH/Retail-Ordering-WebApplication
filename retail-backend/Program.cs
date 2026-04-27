using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy => policy
            .SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAngular");
app.UseAuthorization();
app.MapControllers();

// Seed default data
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    if (!db.Categories.Any())
    {
        db.Categories.AddRange(
            new retail_backend.Models.Category { Name = "Pizza" },
            new retail_backend.Models.Category { Name = "Burger" },
            new retail_backend.Models.Category { Name = "Beverages" }
        );
        db.SaveChanges();
    }

    // Seed a default seller with UserId that matches the frontend mock (101 won't work
    // since identity starts at 1, so we register a real seller and update admin.ts to use their id)
    if (!db.Users.Any(u => u.Role == "Seller"))
    {
        db.Users.Add(new retail_backend.Models.User
        {
            Name = "Default Seller",
            Email = "seller@store.com",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("seller123"),
            Role = "Seller",
            StoreName = "My Store",
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        });
        db.SaveChanges();
    }
}

app.Run();
