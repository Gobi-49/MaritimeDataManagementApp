namespace backend.Models
{
    public class Ship
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public double MaxSpeed { get; set; }
    }
}