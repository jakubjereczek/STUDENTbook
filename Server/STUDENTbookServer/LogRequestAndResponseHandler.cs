using Microsoft.Extensions.Logging;
using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace STUDENTbookServer
{
    public class LogRequestAndResponseHandler : DelegatingHandler
    {

        private static Logger logger = LogManager.GetLogger("STUDENTbookRules");

        protected override async Task<HttpResponseMessage> SendAsync(
            HttpRequestMessage request, CancellationToken cancellationToken)
        {
            // request
            // string requestBody = await request.Content.ReadAsStringAsync();

            logger.Info("*** {0} {1}", request.Method, request.RequestUri);

            // response
            var result = await base.SendAsync(request, cancellationToken);
            var responseBody = await result.Content.ReadAsStringAsync();
            logger.Info("Request StatusCode: {0} - successful: {1}. Response: {2}", result.StatusCode, result.IsSuccessStatusCode, responseBody);

            return result;
        }
    }
}