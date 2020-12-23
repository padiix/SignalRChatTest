using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using SginalRChatTest.Model;

namespace SginalRChatTest.Hubs
{
    public class ChatHub : Hub
    {
        private static readonly List<Message> CachedMessages = new List<Message>();
        private static readonly List<string> ActiveUsers = new List<string>();

        public async Task SendMessage(string message)
        {
            var name = Context.User.Identity.Name;

            await Clients.All.SendAsync("ReceiveMessage", name, message, DateTime.Now.ToString("HH':'mm':'ss dd-MM-yyy"));
            CacheMessage(name, message);
        }

        public override async Task OnConnectedAsync()
        {
            var currentUser = Context.User.Identity.Name;
            if (!ActiveUsers.Contains(currentUser))
            {
                await Clients.Caller.SendAsync("OnConnected", CachedMessages, ActiveUsers);
                await Clients.All.SendAsync("AddNewUser", currentUser);
                ActiveUsers.Add(currentUser);
            }
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var currentUser = Context.User.Identity.Name;
            ActiveUsers.Remove(currentUser);
            await Clients.All.SendAsync("RemoveActiveUser", currentUser);
            await base.OnDisconnectedAsync(exception);
        }

        private static void CacheMessage(string user, string message)
        {
            CachedMessages.Add(new Message(user, message, DateTime.Now.ToString("HH':'mm':'ss dd-MM-yyy")));

            if (CachedMessages.Count > 200)
                CachedMessages.RemoveAt(0);
        }
    }
}
