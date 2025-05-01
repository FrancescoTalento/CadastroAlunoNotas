using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DisciplinasController : ControllerBase
    {
        private readonly AppDbContext _db;

        public DisciplinasController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> ListarDisciplinas()
        {
            var disciplinas = await _db.Disciplinas
                .Select(d => new { d.Id, d.Nome })
                .ToListAsync();

            return Ok(disciplinas);
        }
    }
}
