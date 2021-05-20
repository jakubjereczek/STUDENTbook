using STUDENTbookServer.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace STUDENTbookServer
{
    public class BasicAuthorizationAttribute : AuthorizationFilterAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            if (actionContext.Request.Headers.Authorization == null)
            {
                actionContext.Response = actionContext.Request.CreateResponse(System.Net.HttpStatusCode.Unauthorized);
            }
            else
            {
                try
                {
                    string authenticationToken = actionContext.Request.Headers.Authorization.Parameter;
                    string decodedAuthorizationToken = Encoding.UTF8.GetString(Convert.FromBase64String(authenticationToken));
                    // Należy użyć przed podaniem w naglowku Authorization base64encode.org (nick:password)
                    // Authorization: Basic convertedBase64Encode

                    string[] usernamePasswordArray  = decodedAuthorizationToken.Split(':');
                    string username = usernamePasswordArray[0];
                    string password = usernamePasswordArray[1];

                    if (UserService.Authenticate(username, password))
                    {
                        Thread.CurrentPrincipal = new GenericPrincipal(new GenericIdentity(username), null);
                    }
                    else
                    {
                        actionContext.Response = actionContext.Request.CreateResponse(System.Net.HttpStatusCode.Unauthorized);
                    }
                }catch(Exception ex)
                {
                    actionContext.Response = actionContext.Request.CreateResponse(System.Net.HttpStatusCode.Unauthorized);
                }

            }

            base.OnAuthorization(actionContext);
        }
    }
}