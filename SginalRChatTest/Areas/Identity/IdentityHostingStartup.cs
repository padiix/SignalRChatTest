using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SginalRChatTest.Data;

[assembly: HostingStartup(typeof(SginalRChatTest.Areas.Identity.IdentityHostingStartup))]
namespace SginalRChatTest.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
                services.AddDbContext<SginalRChatTestContext>(options =>
                    options.UseSqlServer(
                        context.Configuration.GetConnectionString("SginalRChatTestContextConnection")));

                services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
                    .AddEntityFrameworkStores<SginalRChatTestContext>();
            });
        }
    }
}