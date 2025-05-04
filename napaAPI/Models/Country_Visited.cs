namespace napaAPI.Models
{
    public class CountryVisited
    {
        public int Id { get; set; }
        public int CountryId { get; set; }
        public int ShipId { get; set; }
        public DateTime DateVisited { get; set; }
    }
}