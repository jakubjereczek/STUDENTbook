using Newtonsoft.Json;
using STUDENTbookServer.Helpers;
using STUDENTbookServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace STUDENTbookServer.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PostsController : ApiController
    {
        // TO DO: Rola admina umozliwiajaca to co uzytkownik zautoryzowany.

        private STUDENTbookEntities _db = new STUDENTbookEntities();

        // GET: api/Posts?&pageNumber=1&pageSize=5
        [HttpGet]
        public HttpResponseMessage Get([FromUri] PagingParameterModel pagingParameterModel)
        {
            List<Posts> postsList = _db.Posts.OrderByDescending(p => p.createdAt).ToList();

            int postsListLength = postsList.Count;
            int CurrentPage = pagingParameterModel.pageNumber;
            int PageSize = pagingParameterModel.pageSize;

            int TotalPages = (int)Math.Ceiling(postsListLength / (double)PageSize);
            List<Posts> postsListByPage = postsList.Skip((CurrentPage - 1) * PageSize).Take(PageSize).ToList();

            var hasPreviousPage = CurrentPage > 1 ? "Yes" : "No";
            var hasNextPage = CurrentPage < TotalPages ? "Yes" : "No";

            // Object which we are going to send in header   
            var paginationMetadata = new
            {
                Length = postsListLength,
                pageSize = PageSize,
                currentPage = CurrentPage,
                totalPages = TotalPages,
                hasPreviousPage,
                hasNextPage
            };

            var response = Request.CreateResponse(HttpStatusCode.OK, postsListByPage);
/*            response.Headers.Add("Access-Control-Allow-Headers", "*");

            response.Headers.Add("X-Paging", JsonConvert.SerializeObject(paginationMetadata));            // Setting Header  
            response.Headers.Add("Access-Control-Expose-Headers", "X-Paging-Headers");
*/
            return Request.CreateResponse(HttpStatusCode.OK, new 
                {
                    postsListByPage,
                    paginationMetadata
                });
        }

        // GET: api/Posts/{id}
        [BasicAuthorization]
        [HttpGet]
        public HttpResponseMessage GetByPostId(int id)
        {
            var Post = _db.Posts.Find(id);
            if (Post == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, string.Format("Post with id = {0} not found", id));
            }
            return Request.CreateResponse(HttpStatusCode.OK, Post);
        }

        // GET: api/Posts/GetBy/username/{name}
        [BasicAuthorization]
        [HttpGet]
        public HttpResponseMessage GetBy(string name)
        {
            var User = _db.Users.FirstOrDefault(u => u.nick == name);
            if (User == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, string.Format("User {0} not found", name));
            }
            var UserPosts = User.Posts;
            return Request.CreateResponse(HttpStatusCode.OK, UserPosts);
        }

        // POST: api/Posts/{userId}
        [BasicAuthorization]
        [HttpPost]
        public HttpResponseMessage Post(int id, [FromBody] Posts post)
        {
            string username = Thread.CurrentPrincipal.Identity.Name; 

            try
            {
                // Szukamy użytkownika o podanym ID:
                var User = _db.Users.Find(id);

                // Sprawdzam czy uzytkownik dodajacy post jest sobą, nie probuje komus innemu dodac postu.
                if (User == null)
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, string.Format("User with id = {0} not found", id));

                if (id != User.userId || username != User.nick)
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, string.Format("Incorrect userId of {0} {1}", User.firstName, User.lastName));            

                if (ModelState.IsValid)
                {
                    User.Posts.Add(post);
                    _db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, post);

                }
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, InnerExceptionFinder.getLastInnerException(ex).Message);
            }
        }

        // PUT: api/Posts/(postId)
        [BasicAuthorization]
        [HttpPut]
        public HttpResponseMessage Put(int id, [FromBody] Posts post)
        {
            string username = Thread.CurrentPrincipal.Identity.Name;

            try
            {
                var User = _db.Users.FirstOrDefault(u => u.nick == username);
         
                if (ModelState.IsValid)
                {       
                    if (User == null)
                        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, string.Format("Incorrect userId of {0} {1}", User.firstName, User.lastName));

                    if (post.userId != User.userId || id != post.postId) // Modyfikacja tylko wlasnych postow
                        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, string.Format("You can not modify post made by other user or you passed bad id", User.firstName, User.lastName));
                   
                    _db.Entry(post).State = System.Data.Entity.EntityState.Modified;
                    _db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, post);

                }
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, InnerExceptionFinder.getLastInnerException(ex).Message);
            }

        }

        // DELETE: api/Posts/(postId)
        [BasicAuthorization]
        [HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                string username = Thread.CurrentPrincipal.Identity.Name; // Uzytkownik który jest autoryzowany, moze usunąć tylko siebie. 
               
                var Post = _db.Posts.Find(id);
                if (Post == null)
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Post do not exist");

                var User = _db.Users.FirstOrDefault(u => u.nick == username);
                if (Post.userId != User.userId)
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "You can not delete post created by other user");

                _db.Posts.Remove(Post);
                _db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "Post has been deleted");

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, InnerExceptionFinder.getLastInnerException(ex).Message);
            }
        }
    }
}