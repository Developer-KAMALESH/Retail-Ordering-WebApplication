using Microsoft.AspNetCore.Mvc;

namespace RetailBackend.Controllers
{
    [ApiController]
    [Route("api/orders")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost("place")]
        public IActionResult PlaceOrder(PlaceOrderDto dto)
        {
            return Ok(_orderService.PlaceOrder(dto));
        }

        [HttpGet("my")]
        public IActionResult MyOrders()
        {
            return Ok(_orderService.GetUserOrders());
        }

        [HttpGet("all")]
        public IActionResult GetAll()
        {
            return Ok(_orderService.GetAllOrders());
        }

        [HttpPut("status/{id}")]
        public IActionResult UpdateStatus(int id, string status)
        {
            return Ok(_orderService.UpdateStatus(id, status));
        }
    }
}
