namespace SginalRChatTest.Model
{
    public class UsersConnections
    {
        public UsersConnections(string userName, int numberOfConnections)
        {
            UserName = userName;
            NumberOfConnections = numberOfConnections;
        }

        public string UserName { get; }

        public int NumberOfConnections { get; set; }

    }
}