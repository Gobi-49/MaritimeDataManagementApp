namespace napaAPI.Models
{
    public class Voyage
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public required int DeparturePortId { get; set; }
        public required int ArrivalPortId { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public required int ShipId { get; set; }
    }
}