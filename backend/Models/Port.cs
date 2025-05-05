namespace backend.Models
{
    public class Port
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required int CountryId { get; set; }
    }
}