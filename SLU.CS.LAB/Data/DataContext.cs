﻿using Microsoft.EntityFrameworkCore;
using SLU.CS.LAB.Models;

namespace SLU.CS.LAB.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<ActivityLog> ActivityLogs { get; set; }
        public DbSet<Schedule> TASchedules { get; set; }

        public DbSet<Ticket> Tickets { get; set; }

    }
}
