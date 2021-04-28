using System.Collections.Generic;
using System.Threading.Tasks;
using RealTimeTodo.Web.Model;
using RealTimeTodo.Web.Hubs;

namespace RealTimeTodo.Web.Services
{
    public interface IToDoRepository
    {
        Task<List<ToDoList>> GetLists();
    }

    public class InMemoryToDoRepository : IToDoRepository
    {
        private static List<ToDoList> Lists { get; set; } = new List<ToDoList>();

        Task<List<ToDoList>> IToDoRepository.GetLists()
        {
            throw new System.NotImplementedException();
        }
    }
}
