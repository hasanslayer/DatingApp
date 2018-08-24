using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Helpers;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IDatingRepository
    {
        void Add<T>(T entity) where T : class; // single generic add method (user,photo,...,etc)
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<PagedList<User>> GetUsers(UserParams userParams);
        Task<User> GetUser(int id);
        Task<Photo> GetPhoto(int id);
        Task<Photo> GetMainPhotoForUser(int userId);
        Task<Like> GetLike(int userId, int recipientId);
        Task<Message> GetMessage(int Id);
        Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams); // for inbox, outbox and unReadMessages
        Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId); // to display the messages between two specific users
    }
}