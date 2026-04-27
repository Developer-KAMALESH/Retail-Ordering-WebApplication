using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RetailBackend.Models
{
    public class Cart
    {
        [Key]
        public int CartId { get; set; }

        public int UserId { get; set; }

        //[ForeignKey("UserId")]   // ✅ ADD THIS
        public User User { get; set; }
    }
}
