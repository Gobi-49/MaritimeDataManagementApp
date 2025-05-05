using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using backend.Data;

namespace backend.Services
{
    public class DailyVisitsCleanupService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly TimeSpan _cleanupInterval = TimeSpan.FromDays(1); // Set the interval to 24 hours

        public DailyVisitsCleanupService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _serviceProvider.CreateScope())
                {
                    var dbContext = scope.ServiceProvider.GetRequiredService<DataContext>();
                    var cutoff = DateTime.Now.AddYears(-1); // Set the cutoff date to 1 year ago
                    var countriesVisited = await dbContext.CountriesVisited
                        .Where(cv => cv.DateVisited < cutoff)
                        .ToListAsync(stoppingToken);

                    if (countriesVisited.Any())
                    {
                        dbContext.CountriesVisited.RemoveRange(countriesVisited);
                        await dbContext.SaveChangesAsync(stoppingToken);
                    }
                }

                await Task.Delay(_cleanupInterval, stoppingToken); // Wait for the next interval
            }
        }
    }
}