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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Voyage>()
                .HasOne(v => v.DeparturePort)
                .WithMany()
                .HasForeignKey(v => v.DeparturePortId)
                .OnDelete(DeleteBehavior.Restrict); // prevents cascade conflict

            modelBuilder.Entity<Voyage>()
                .HasOne(v => v.ArrivalPort)
                .WithMany()
                .HasForeignKey(v => v.ArrivalPortId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Voyage>()
                .HasOne(v => v.Ship)
                .WithMany()
                .HasForeignKey(v => v.ShipId);
                }
    }  
}