﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace STUDENTbookServer.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class STUDENTbookEntities : DbContext
    {
        public STUDENTbookEntities()
            : base("name=STUDENTbookEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<PostAnswers> PostAnswers { get; set; }
        public virtual DbSet<Posts> Posts { get; set; }
        public virtual DbSet<University> University { get; set; }
        public virtual DbSet<Users> Users { get; set; }
    }
}