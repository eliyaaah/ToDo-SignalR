using System.Collections.Generic;
using System.Threading.Tasks;
using RealTimeTodo.Web.Model;
using RealTimeTodo.Web.Hubs;
using System.Linq;
using System;

namespace RealTimeTodo.Web.Services
{
    public interface IToDoRepository
    {
        Task<IEnumerable<ToDoListMinimal>> GetLists();
        Task<ToDoList> GetList(int id);
        Task AddToDoItem(int listId, string text);
        Task ToggleToDoItem(int listId, int itemId);
    }

    public class InMemoryToDoRepository : IToDoRepository
    {
        private static List<ToDoList> Lists { get; set; } = new List<ToDoList>();

        static InMemoryToDoRepository()
        {
            Lists.Add(new ToDoList() { Id = 0, Name = "Foo", Items = new List<ToDoItem>() });
            Lists.Add(new ToDoList() { Id = 1, Name = "Bar", Items = new List<ToDoItem>() });
            Lists.Add(new ToDoList() { Id = 2, Name = "Test", Items = new List<ToDoItem>() });
            Lists.Add(new ToDoList() { Id = 3, Name = "Fail", Items = new List<ToDoItem>() });
        }

        public Task<IEnumerable<ToDoListMinimal>> GetLists()
        {
            return Task.FromResult(Lists.Select(p => p.GetMinimal()));
        }

        public Task<ToDoList> GetList(int id)
        {
            return Task.FromResult(Lists.FirstOrDefault(p => p.Id.Equals(id)));
        }

        public async Task AddToDoItem(int listId, string text)
        {
            var getList = await GetList(listId);

            if (getList == null) {
                throw new NullReferenceException("Invalid list id");
            }

            getList.AddItem(text);
        }

        public async Task ToggleToDoItem(int listId, int itemId)
        {
            var getList = await GetList(listId);

            if (getList == null) {
                throw new NullReferenceException("Invalid list id");
            }

            getList.Toggle(itemId);
        }
    }
}
