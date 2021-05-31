using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Configuration;
using System.Text;
using System.Web.Http.Routing;
using System.Net.Http;
using System.Web.Http.Cors;


namespace STUDENTbookServer
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Konfiguracja i usługi składnika Web API

            // Trasy składnika Web API
            config.MapHttpAttributeRoutes();

            config.EnableCors();

            config.Routes.MapHttpRoute(
                name: "DefaultApiWithId",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                name: "DefaultApiWithMultipleId",
                routeTemplate: "api/{controller}/{id}/{id2}",
                defaults: new { id = RouteParameter.Optional, id2 = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/username/{name}",
                defaults: new { action = RouteParameter.Optional, name = RouteParameter.Optional }
            );

            var appXmlType = config.Formatters.XmlFormatter.SupportedMediaTypes.FirstOrDefault(t => t.MediaType == "application/xml");
            config.Formatters.XmlFormatter.SupportedMediaTypes.Remove(appXmlType); // Odpowiedzi tylko JSON

            config.MessageHandlers.Add(new LogRequestAndResponseHandler());
        }
    }
}
