namespace napaAPI.Models
{
    public class Voyage
    {
        public int Id { get; set; }
        public DateTime VoyageDate { get; set; }

        public int DeparturePortId { get; set; }
        public Port DeparturePort { get; set; }

        public int ArrivalPortId { get; set; }
        public Port ArrivalPort { get; set; }

        public string Start { get; set; }
        public string End { get; set; }

        public int ShipId { get; set; }
        public Ship Ship { get; set; }
    }
}