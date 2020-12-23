using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using SginalRChatTest.Model;

namespace SginalRChatTest.Hubs
{
    public class ChatHub : Hub
    {
        private static readonly List<Message> CachedMessages = new List<Message>();
        private static readonly List<UsersConnections> ActiveUsers = new List<UsersConnections>();

        public async Task SendMessage(string message)
        {
            var name = Context.User.Identity.Name;

            await Clients.All.SendAsync("ReceiveMessage", name, message, DateTime.Now.ToString("HH':'mm':'ss dd-MM-yyy"));
            CacheMessage(name, message);
        }

        public override async Task OnConnectedAsync()
        {
            var currentUser = Context.User.Identity.Name;
            foreach (var activeUser in ActiveUsers.Where(activeUser => activeUser.UserName == currentUser))
            {
                activeUser.NumberOfConnections++;
                await Clients.Caller.SendAsync("OnConnected", CachedMessages, ActiveUsers);
                return;
            }
            await Clients.Caller.SendAsync("OnConnected", CachedMessages, ActiveUsers);
            await Clients.All.SendAsync("AddNewUser", currentUser);
            ActiveUsers.Add(new UsersConnections(currentUser, 1));
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var currentUser = Context.User.Identity.Name;
            foreach (var activeUser in ActiveUsers)
            {
                if (activeUser.UserName == currentUser && activeUser.NumberOfConnections <= 1)
                {
                    ActiveUsers.Remove(activeUser);
                    await Clients.All.SendAsync("RemoveActiveUser", currentUser);
                    await base.OnDisconnectedAsync(exception);
                    return;
                }
                activeUser.NumberOfConnections--;
            }

        }

        private static void CacheMessage(string user, string message)
        {
            CachedMessages.Add(new Message(user, message, DateTime.Now.ToString("HH':'mm':'ss dd-MM-yyy")));

            if (CachedMessages.Count > 200)
                CachedMessages.RemoveAt(0);
        }
    }
}
