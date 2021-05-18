using STUDENTbookServer.Models;
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
        public IHttpActionResult Get()
        {
            return Ok(_db.Users.ToList());
        }

        // GET: api/Users/5
        public IHttpActionResult Get(int id)
        {
            return Ok(_db.Users.Find(id));
        }

        // POST: api/Users
        public IHttpActionResult Post([FromBody] Users user)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _db.Users.Add(user);
                    _db.SaveChanges();
                    return Ok(user);
                }
                return BadRequest(ModelState);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        // PUT: api/Users/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Users/5
        public void Delete(int id)
        {
        }
    }
}
