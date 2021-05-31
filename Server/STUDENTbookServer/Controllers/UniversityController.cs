using STUDENTbookServer.Helpers;
using STUDENTbookServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;
using System.Web.Http.Cors;

namespace STUDENTbookServer.Controllers
{

    // Aktulanie nie ma żadnych rol weryfikujacych kto jest administratorem.
    // I na sztywno istnieje konto admin, ktore ma dostep do usuwania.

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UniversityController : ApiController
    {
        // TODO: Rola Admina
        private STUDENTbookEntities _db = new STUDENTbookEntities();

        // GET: api/University
        public HttpResponseMessage Get()
        {
            List<University> universitiesList = _db.University.ToList();
            return Request.CreateResponse(HttpStatusCode.OK, universitiesList);
        }

        // GET: api/University/{universityId}
        [BasicAuthorization]
        public HttpResponseMessage Get(int id)
        {
            var University = _db.University.Find(id);
            if (University == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, string.Format("University with id = {0} not found", id));
            }
            return Request.CreateResponse(HttpStatusCode.OK, University);
        }

        // POST: api/University
        [HttpPost]
        [BasicAuthorization]
        public HttpResponseMessage Post([FromBody] University university)
        {
            string username = Thread.CurrentPrincipal.Identity.Name;
            // Prosty sposob - zapytanie tylko dla admina - uzytkownika o takim nicku. W przyszlosci role.
            if (username.ToLower() != "admin")
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, string.Format("Only admin account can add new university", university.name));

            var UniversityExist = _db.University.Find(university.universityId); 
            if (UniversityExist != null)
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, string.Format("University {0} already exists", university.name));

            try
            {
                if (ModelState.IsValid)
                {
                    _db.University.Add(university);
                    _db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, university);
                }
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, InnerExceptionFinder.getLastInnerException(ex).Message);
            }
        }

        // PUT: api/University/{universityId}
        [HttpPost]
        [BasicAuthorization]
        // to idd!!!
        public HttpResponseMessage Put(int id, [FromBody] University university)
        {
            string username = Thread.CurrentPrincipal.Identity.Name;
            // Prosty sposob - zapytanie tylko dla admina - uzytkownika o takim nicku. W przyszlosci role.
            if (username.ToLower() != "admin")
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, string.Format("Only admin account can modify university", university.name));

            try
            {
                if (ModelState.IsValid)
                {
                    _db.Entry(university).State = System.Data.Entity.EntityState.Modified;
                    _db.SaveChanges();

                    return Request.CreateResponse(HttpStatusCode.OK, university);
                }
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, InnerExceptionFinder.getLastInnerException(ex).Message);
            }
        }

        // DELETE: api/University/{universityId}
        [BasicAuthorization]
        [HttpDelete]
        public HttpResponseMessage Delete([FromUri] int id)
        {

            try
            {
                var University = _db.University.Find(id);
                if (University == null)
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "University do not exist");

                string username = Thread.CurrentPrincipal.Identity.Name;
                // Prosty sposob - zapytanie tylko dla admina - uzytkownika o takim nicku. W przyszlosci role.
                if (username.ToLower() != "admin")
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, string.Format("Only admin account can delete university", University.name));

                _db.University.Remove(University);
                _db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "University has been deleted");

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, InnerExceptionFinder.getLastInnerException(ex).Message);
            }

        }
    }
}
