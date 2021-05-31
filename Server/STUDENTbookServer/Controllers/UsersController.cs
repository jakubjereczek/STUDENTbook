using Microsoft.AspNetCore.JsonPatch;
using Microsoft.Extensions.Logging;
using NLog;
using STUDENTbookServer.Helpers;
using STUDENTbookServer.Models;
using STUDENTbookServer.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Threading;
using System.Web.Http;
using System.Web.Http.Cors;

namespace STUDENTbookServer.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UsersController : ApiController
    {
        // Uchwyt do bazy danych
        private STUDENTbookEntities _db = new STUDENTbookEntities();

        // GET: api/Users
        public HttpResponseMessage Get()
        {
            List<Users> usersList = _db.Users.ToList();
            usersList.ForEach(user => user.password = null);
            return Request.CreateResponse(HttpStatusCode.OK, usersList);
        }

        // GET: api/Users/5
        [BasicAuthorization]
        public HttpResponseMessage Get(int id)
        {
            var User = _db.Users.Find(id);
            if (User == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, string.Format("User with id = {0} not found", id));
            }
            User.password = null;
            return Request.CreateResponse(HttpStatusCode.OK, User);
        }

        // GET: api/Users/GetBy/username/{name}
        [BasicAuthorization]
        [HttpGet]
        public HttpResponseMessage GetBy(string name)
        {
            var User = _db.Users.FirstOrDefault(u => u.nick == name);
            User.password = null;
            if (User == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, string.Format("User {0} not found", name));
            }
            return Request.CreateResponse(HttpStatusCode.OK, User);
        }

        // POST: api/Users
        [HttpPost]
        public HttpResponseMessage Post([FromBody] Users user)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var UserExist = _db.Users.Find(user.userId);
                    if (UserExist != null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, string.Format("User {0} {1} already exists", user.firstName, user.lastName));
                    }

                    user.password = UserService.HashPassword(user.password);

                    _db.Users.Add(user);
                    _db.SaveChanges();

                    return Request.CreateResponse(HttpStatusCode.OK, user);
                }
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, InnerExceptionFinder.getLastInnerException(ex).Message);
            }
        }

        // PUT: api/Users/5
        [BasicAuthorization]
        [HttpPut]
        public HttpResponseMessage Put(int id, [FromBody] Users user)
        {
            string username = Thread.CurrentPrincipal.Identity.Name; // Uzytkownik który jest autoryzowany, moze edytować tylko siebie. 

            try
            {
                if (id != user.userId || username != user.nick)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, string.Format("Incorrect userId of {0} {1} or you can not modfify other user", user.firstName, user.lastName));
                }

                if (ModelState.IsValid)
                {
                    _db.Entry(user).State = System.Data.Entity.EntityState.Modified;
                    user.password = UserService.HashPassword(user.password); // Przekazanie hasla do shashowania przed zapisaniem.
                    _db.SaveChanges();

                    user.password = null; // Odpowiedz bez hasła.
                    return Request.CreateResponse(HttpStatusCode.OK, user);
                }
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, InnerExceptionFinder.getLastInnerException(ex).Message);
            }

        }


        // DELETE: api/Users/5
        [BasicAuthorization]
        [HttpDelete]
        public HttpResponseMessage Delete([FromUri] int id)
        {
            try
            {
                var User = _db.Users.Find(id);
                if (User == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "User do not exist");
                }
                string username = Thread.CurrentPrincipal.Identity.Name; // Uzytkownik który jest autoryzowany, moze usunąć tylko siebie. 

                if (username != User.nick)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "You can not delete other user");
                }
                _db.Users.Remove(User);
                _db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "User has been deleted");
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, InnerExceptionFinder.getLastInnerException(ex).Message);
            }

        }

    }
}
