using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using napaAPI.Data;
using napaAPI.Models;

[ApiController]
[Route("api/[controller]")]
public class PortsController : ControllerBase
{
    private readonly DataContext _context;

    public PortsController(DataContext context)
    {
        _context = context;
    }

    // GET: api/ports
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Port>>> GetPorts()
    {
        return await _context.Ports.ToListAsync();
    }

    // GET: api/ports/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Port>> GetPort(int id)
    {
        var port = await _context.Ports.FindAsync(id);

        if (port == null)
        {
            return NotFound();
        }

        return port;
    }

    // POST: api/ports
    [HttpPost]
    public async Task<ActionResult<Port>> PostPort(Port port)
    {
        _context.Ports.Add(port);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPort), new { id = port.Id }, port);
    }
    
    // DELETE: api/ports/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePort(int id)
    {
        var port = await _context.Ports.FindAsync(id);
        if (port == null)
        {
            return NotFound();
        }

        _context.Ports.Remove(port);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // PUT: api/ports/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> PutPort(int id, Port port)
    {
        if (id != port.Id)
        {
            return BadRequest();
        }

        var existingPort = await _context.Ports.FindAsync(id);

        if (existingPort == null)
        {
            return NotFound();
        }

        existingPort.Name = port.Name;
        existingPort.CountryId = port.CountryId;

        await _context.SaveChangesAsync();

        return Ok(existingPort);
    }
}