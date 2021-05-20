using Microsoft.AspNetCore.JsonPatch;
using STUDENTbookServer.Models;
using STUDENTbookServer.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace STUDENTbookServer.Controllers
{
    public class UsersController : ApiController
    {
        // Uchwyt do bazy danych
        private STUDENTbookEntities _db = new STUDENTbookEntities();


        // GET: api/Users
        public HttpResponseMessage Get()
        {
            return Request.CreateResponse(HttpStatusCode.OK, _db.Users.ToList());
        }

        // GET: api/Users/5
        [BasicAuthorization]
        public HttpResponseMessage Get(int id)
        {
            var User = _db.Users.Find(id);
            if (User == null) {
                var message = string.Format("User with id = {0} not found", id);
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, message);
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
                        var message = string.Format("User {0} {1} already exists", user.firstName, user.lastName);
                        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, message);
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
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }

        }

        // PUT: api/Users/5
        [HttpPut]
        public HttpResponseMessage Put(int id, [FromBody] Users user)
        {
            try
            {
                if (id != user.userId)
                {
                    var message = string.Format("Incorrect userId of {0} {1}", user.firstName, user.lastName);
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, message);
                }

                if (ModelState.IsValid)
                {
                    _db.Entry(user).State = System.Data.Entity.EntityState.Modified;
                    _db.SaveChanges();
                    var message = string.Format("User {0} {1} has been modified", user.firstName, user.lastName);
                    return Request.CreateResponse(HttpStatusCode.OK, message);
                }
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }

        }


        // DELETE: api/Users/5
        public HttpResponseMessage Delete([FromUri] int id)
        {
            try
            {
                var User = _db.Users.Find(id);
                if (User == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "User does not exist" );
                }
                _db.Users.Remove(User);
                _db.SaveChanges();
                var message = string.Format("User has been deleted");
                return Request.CreateResponse(HttpStatusCode.OK, message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }

        }
    }
}
