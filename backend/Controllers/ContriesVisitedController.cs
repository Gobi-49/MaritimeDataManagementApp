using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

[ApiController]
[Route("api/[controller]")]
public class CountriesVisitedController : ControllerBase
{
    private readonly DataContext _context;

    public CountriesVisitedController(DataContext context)
    {
        _context = context;
    }

    // GET: api/countriesvisited
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CountryVisited>>> GetCountriesVisited()
    {
        return await _context.CountriesVisited.ToListAsync();
    }

    // GET: api/countriesvisited/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<CountryVisited>> GetCountryVisited(int id)
    {
        var visit = await _context.CountriesVisited.FindAsync(id);

        if (visit == null)
        {
            return NotFound();
        }

        return visit;
    }

    // POST: api/countriesvisited
    [HttpPost]
    public async Task<ActionResult<CountryVisited>> PostCountryVisited(CountryVisited visit)
    {
        _context.CountriesVisited.Add(visit);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCountryVisited), new { id = visit.Id }, visit);
    }

    // DELETE: api/countriesvisited/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCountryVisited(int id)
    {
        var visit = await _context.CountriesVisited.FindAsync(id);
        if (visit == null)
        {
            return NotFound();
        }

        _context.CountriesVisited.Remove(visit);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // PUT: api/countriesvisited/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> PutCountryVisited(int id, CountryVisited visit)
    {
        if (id != visit.Id)
        {
            return BadRequest();
        }

        var existingVisit = await _context.CountriesVisited.FindAsync(id);

        if (existingVisit == null)
        {
            return NotFound();
        }

        existingVisit.ShipId = visit.ShipId;
        existingVisit.CountryId = visit.CountryId;
        existingVisit.DateVisited = visit.DateVisited;

        await _context.SaveChangesAsync();

        return Ok(existingVisit);
    }
}
