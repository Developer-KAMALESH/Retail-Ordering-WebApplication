using Microsoft.AspNetCore.Mvc;

namespace RetailBackend.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_productService.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_productService.GetById(id));
        }

        [HttpPost]
        public IActionResult Add(ProductDto dto)
        {
            return Ok(_productService.Add(dto));
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, ProductDto dto)
        {
            return Ok(_productService.Update(id, dto));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            return Ok(_productService.Delete(id));
        }
    }
}
