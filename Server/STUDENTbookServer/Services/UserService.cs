using Microsoft.IdentityModel.Tokens;
using STUDENTbookServer.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Web;

namespace STUDENTbookServer.Services
{
    public class UserService 
    {

        public static bool Authenticate(string username, string password)
        {
            string hashedPassword = HashPassword(password);
            using (STUDENTbookEntities _db = new STUDENTbookEntities())
            {
                var user = _db.Users.Any(u => u.nick.Equals(username, StringComparison.OrdinalIgnoreCase) && u.password == hashedPassword);
                return user;
            }
        }

        public static string HashPassword(string password)
        {
            // TODO: SALT 
            var bytes = new UTF8Encoding().GetBytes(password);
            byte[] hashBytes;
            using (var algorithm = new System.Security.Cryptography.SHA512Managed())
            {
                hashBytes = algorithm.ComputeHash(bytes);
            }
            return Convert.ToBase64String(hashBytes);
        }

    }
}