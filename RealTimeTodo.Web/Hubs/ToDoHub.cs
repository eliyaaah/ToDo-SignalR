using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using RealTimeTodo.Web.Model;
using RealTimeTodo.Web.Services;

namespace RealTimeTodo.Web.Hubs
{
    public class ToDoHub : Hub
    {
        private readonly IToDoRepository _toDoRepository;

        public ToDoHub(IToDoRepository toDoRepository)
        {
            this._toDoRepository = toDoRepository;
        }

        public Task GetLists()
        {
            var results = _toDoRepository.GetLists();

            return Clients.Caller.SendAsync("UpdateToDoList", results);
        }

        public async Task GetList(int listId) {
            var result = await _toDoRepository.GetList(listId);

            await Clients.Caller.SendAsync("UpdatedListData", result);
        }

        public async Task SubscribeToCountUpdates() {
            await Groups.AddToGroupAsync(Context.ConnectionId, "Counts");
        }

        public async Task UnsubscribeFromCountUpdates() {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "Counts");
        }

        public async Task SubscribeToListUpdates(int listId) {
            var groupName = ListIdToGroupName(listId);
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        }

        public async Task UnubscribeFromListUpdates(int listId) {
            var groupName = ListIdToGroupName(listId);
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        }

        public async Task AddToDoList(int listId, string text) {
            await _toDoRepository.AddToDoItem(listId, text);

            // notify list count updates
            var allLists = _toDoRepository.GetLists();
            var listUpdate = await _toDoRepository.GetList(listId);

            // notify list viewers on update
            var groupName = ListIdToGroupName(listId);
            await Clients.Group("Counts").SendAsync("UpdateToDoList", allLists);
            await Clients.Group(groupName).SendAsync("UpdatedListData", allLists);
        }
        
        public async Task ToggleToDoItem(int listId, int itemId) {
            await _toDoRepository.ToggleToDoItem(listId, itemId);

            // notify list count updates
            var allLists = _toDoRepository.GetLists();
            var listUpdate = await _toDoRepository.GetList(listId);

            // notify list viewers on update
            var groupName = ListIdToGroupName(listId);
            await Clients.Group("Counts").SendAsync("UpdateToDoList", allLists);
            await Clients.Group(groupName).SendAsync("UpdatedListData", allLists);
        }

        private string ListIdToGroupName(int listId) => $"list-updates-{listId}";
    }
}