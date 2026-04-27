using System.ComponentModel.DataAnnotations;

namespace RetailBackend.Models
{
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }

        public string Name { get; set; }
        public List<Product> Products { get; set; }
    }
}
