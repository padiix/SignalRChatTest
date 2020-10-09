namespace SginalRChatTest.Model
{
    public class Message
    {
        public Message(string userName, string messageText, string sentTime)
        {
            UserName = userName;
            MessageText = messageText;
            SentTime = sentTime;
        }

        public string UserName { get; }

        public string MessageText { get; }

        public string SentTime { get; }

    }
}