﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SLU.CS.LAB.Data;
using SLU.CS.LAB.Models;

namespace SLU.CS.LAB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {

        private readonly DataContext _context;

        public AdminController(DataContext context)
        {
            _context = context;
        }


        //Get All Tutors
        [HttpGet]
        public async Task<ActionResult<List<User>>> GetAllUser()
        {
            var result = await _context.Users.ToListAsync();
            return Ok(result);
        }
    }
}