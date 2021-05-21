using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace STUDENTbookServer.Helpers
{
    public class InnerExceptionFinder
    {
        public static Exception getLastInnerException(Exception ex)
        {
            if (ex.InnerException != null)
            {
                return getLastInnerException(ex.InnerException);
            }else
            {
                return ex;
            }
        } 
    }
}