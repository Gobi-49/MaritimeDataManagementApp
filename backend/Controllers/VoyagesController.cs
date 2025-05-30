using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

[ApiController]
[Route("api/[controller]")]
public class VoyagesController : ControllerBase
{
    private readonly DataContext _context;

    public VoyagesController(DataContext context)
    {
        _context = context;
    }

    // GET: api/voyages
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Voyage>>> GetVoyages()
    {
        return await _context.Voyages.ToListAsync();
    }

    // GET: api/voyages/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Voyage>> GetVoyage(int id)
    {
        var voyage = await _context.Voyages.FindAsync(id);

        if (voyage == null)
        {
            return NotFound();
        }

        return voyage;
    }

    // POST: api/voyages
    [HttpPost]
    public async Task<ActionResult<Voyage>> PostVoyage(Voyage voyage)
    {
        _context.Voyages.Add(voyage);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetVoyage), new { id = voyage.Id }, voyage);
    }
    
    // DELETE: api/voyages/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteVoyage(int id)
    {
        var voyage = await _context.Voyages.FindAsync(id);
        if (voyage == null)
        {
            return NotFound();
        }

        _context.Voyages.Remove(voyage);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // PUT: api/voyages/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> PutVoyage(int id, Voyage voyage)
    {
    if (id != voyage.Id)
    {
        return BadRequest();
    }

    var existing = await _context.Voyages.FindAsync(id);
    if (existing == null)
    {
        return NotFound();
    }

    existing.Date = voyage.Date;
    existing.DeparturePortId = voyage.DeparturePortId;
    existing.ArrivalPortId = voyage.ArrivalPortId;
    existing.Start = voyage.Start;
    existing.End = voyage.End;
    existing.ShipId = voyage.ShipId;

    await _context.SaveChangesAsync();

    return Ok(existing);
    }
}