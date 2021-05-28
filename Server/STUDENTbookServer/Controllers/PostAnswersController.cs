using STUDENTbookServer.Helpers;
using STUDENTbookServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;

namespace STUDENTbookServer.Controllers
{
    public class PostAnswersController : ApiController
    {

        private STUDENTbookEntities _db = new STUDENTbookEntities();

        // GET: api/PostAnswers
        [HttpGet]
        public HttpResponseMessage Get()
        {
            List<PostAnswers> PostAnswersList = _db.PostAnswers.ToList();
            return Request.CreateResponse(HttpStatusCode.OK, PostAnswersList);
        }

        // GET: api/PostAnswers/{id}
        [BasicAuthorization]
        [HttpGet]
        public HttpResponseMessage GetByPostId(int id)
        {
            var Post = _db.PostAnswers.Find(id);
            if (Post == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, string.Format("Post answer with id = {0} not found", id));
            }
            return Request.CreateResponse(HttpStatusCode.OK, Post);
        }

        // GET: api/PostAnswers/GetBy/username/{name}
        [BasicAuthorization]
        [HttpGet]
        public HttpResponseMessage GetBy(string name)
        {
            var User = _db.Users.FirstOrDefault(u => u.nick == name);
            if (User == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, string.Format("User {0} not found", name));
            }
            int id = User.userId;

            List<PostAnswers> PostAnswersList = _db.PostAnswers.Where(p => p.userId == id).ToList();
                
            return Request.CreateResponse(HttpStatusCode.OK, PostAnswersList);
        }

        // POST: api/PostAnswers/{postId}
        [BasicAuthorization]
        [HttpPost]
        public HttpResponseMessage Post(int id, [FromBody] PostAnswers postAnswer)
        {
            string username = Thread.CurrentPrincipal.Identity.Name; 

            try
            {
                // Szukamy użytkownika o podanym ID:
                var Post = _db.Posts.Find(id); // Szukam konkretnego postu do którego pisze odpowiedz
                var User = _db.Users.Find(postAnswer.userId); // Uzytkownik

                if (User == null)
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, string.Format("User with id = {0} not found", id));

                if (Post == null)
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, string.Format("Post with id = {0} not found", id));

                if (postAnswer.userId != User.userId || username != User.nick)
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, string.Format("Incorrect userId of {0} {1} or you tried to add answer as other user", User.firstName, User.lastName));


                if (ModelState.IsValid)
                {
                    Post.PostAnswers.Add(postAnswer);
                    _db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, postAnswer);
                }
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, InnerExceptionFinder.getLastInnerException(ex).Message);

            }

        }

        // PUT: api/PostAnswers/{postAnswerId}
        [BasicAuthorization]
        [HttpPut]
        public HttpResponseMessage Put(int id, [FromBody] PostAnswers postAnswer)
        {
            string username = Thread.CurrentPrincipal.Identity.Name;

            try
            {
                if (ModelState.IsValid)
                {

                    var CurrentPostAnswer = _db.PostAnswers.Find(id);
                    var User = _db.Users.Find(CurrentPostAnswer.userId); // To musi być User ktory jest pobrany z oryginalnego Posta.
                    if (User == null)
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, string.Format("User with id = {0} not found", postAnswer.userId));

                    System.Diagnostics.Debug.WriteLine("Test {0} {1}", User.nick, username);

                    if (User.nick != username || id != postAnswer.answerId)
                        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, string.Format("Incorrect postAnswer Id or you tried to change answer created by other user"));

                    // Muszę tutaj robić recznie, poniewa dwa razy pobieram Model i nie dziala poprawnie.
                    CurrentPostAnswer.content = postAnswer.content;
                    CurrentPostAnswer.createdAt = postAnswer.createdAt;
                    CurrentPostAnswer.editedAt = postAnswer.editedAt;

                    _db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, CurrentPostAnswer);
                }
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, InnerExceptionFinder.getLastInnerException(ex).Message);
            }
        }



        // DELETE: api/PostAnswers/(postId)
        [BasicAuthorization]
        [HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                string username = Thread.CurrentPrincipal.Identity.Name; // Uzytkownik który jest autoryzowany moze usunąć.

                var PostAnswer = _db.PostAnswers.Find(id);
                if (PostAnswer == null)
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Post answer do not exist");

                var User = _db.Users.FirstOrDefault(u => u.nick == username);
                if (PostAnswer.userId != User.userId)
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "You can not delete post answer created by other user");

                _db.PostAnswers.Remove(PostAnswer);
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
