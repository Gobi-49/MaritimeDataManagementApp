using Microsoft.EntityFrameworkCore;
using napaAPI.Models;

namespace napaAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Ship> Ships { get; set; }
        public DbSet<Port> Ports { get; set; }
        public DbSet<Voyage> Voyages { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<CountryVisited> CountriesVisited { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Voyage>()
                .HasOne<Port>()
                .WithMany()
                .HasForeignKey(v => v.DeparturePortId)
                .OnDelete(DeleteBehavior.Restrict); // prevents cascade conflict

            modelBuilder.Entity<Voyage>()
                .HasOne<Port>()
                .WithMany()
                .HasForeignKey(v => v.ArrivalPortId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Voyage>()
                .HasOne<Ship>()
                .WithMany()
                .HasForeignKey(v => v.ShipId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Port>()
                .HasOne<Country>()
                .WithMany()
                .HasForeignKey(p => p.CountryId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<CountryVisited>()
                .HasOne<Country>()
                .WithMany()
                .HasForeignKey(cv => cv.CountryId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<CountryVisited>()
                .HasOne<Ship>()
                .WithMany()
                .HasForeignKey(cv => cv.ShipId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}