using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RetailBackend.Models
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public int CategoryId { get; set; }

        [ForeignKey("CategoryId")]
        public Category Category { get; set; }

        public int SellerId { get; set; }

        [ForeignKey("SellerId")]
        public User Seller { get; set; }

        public int StockQuantity { get; set; }

        public bool IsAvailable { get; set; } = true;

        public string ImageUrl { get; set; }
    }
}
