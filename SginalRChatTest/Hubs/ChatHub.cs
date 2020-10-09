using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using SginalRChatTest.Model;

namespace SginalRChatTest.Hubs
{
    public class ChatHub : Hub
    {
        private static readonly List<Message> CachedMessages = new List<Message>();

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message, DateTime.Now.ToString("HH':'mm':'ss dd-MM-yyy"));
            CacheMessage(user, message);
        }

        public override async Task OnConnectedAsync()
        {
            await Clients.Caller.SendAsync("OnConnected", CachedMessages);
        }

        private static void CacheMessage(string user, string message)
        {
            CachedMessages.Add(new Message(user, message, DateTime.Now.ToString("HH':'mm':'ss dd-MM-yyy")));

            if (CachedMessages.Count > 200)
                CachedMessages.RemoveAt(0);

        }
    }
}
