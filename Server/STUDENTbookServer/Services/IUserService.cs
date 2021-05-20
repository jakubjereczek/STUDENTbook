using STUDENTbookServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace STUDENTbookServer.Services
{
    interface IUserService
    {
        Users Authenticate(String nick, string password);
    }
}
