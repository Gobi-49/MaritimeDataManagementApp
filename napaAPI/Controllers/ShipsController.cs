using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using napaAPI.Data;
using napaAPI.Models;

[ApiController]
[Route("api/[controller]")]
public class ShipsController : ControllerBase
{
    private readonly DataContext _context;

    public ShipsController(DataContext context)
    {
        _context = context;
    }

    // GET: api/ships
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Ship>>> GetShips()
    {
        return await _context.Ships.ToListAsync();
    }

    // GET: api/ships/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Ship>> GetShip(int id)
    {
        var ship = await _context.Ships.FindAsync(id);

        if (ship == null)
        {
            return NotFound();
        }

        return ship;
    }

    // POST: api/ships
    [HttpPost]
    public async Task<ActionResult<Ship>> PostShip(Ship ship)
    {
        _context.Ships.Add(ship);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetShip), new { id = ship.Id }, ship);
    }
    
    // Delete: api/ships/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteShip(int id)
    {
        var ship = await _context.Ships.FindAsync(id);
        if (ship == null)
        {
            return NotFound();
        }

        _context.Ships.Remove(ship);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}