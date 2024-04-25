using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using BienesRaicesBackend.Models;
using System.Text.Json.Serialization;
using BienesRaicesBackend.Services.Contracts;
using BienesRaicesBackend.Services.Repositories;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using BienesRaicesBackend.HubService;
using BienesRaicesBackend.Models.Custom;
using Microsoft.Extensions.Options;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DbBienesRaicesContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("cadenaSQL")));
builder.Services.AddScoped<IGenericRepository<Categorium>, CategoryRepository>();
builder.Services.AddScoped<IGenericRepository<Precio>, PricesRepository>();
builder.Services.AddScoped<IGenericAuthRepository<Usuario>, UsuarioRepository>();
builder.Services.AddScoped<IGenericPropertiesRepository<Propiedade>, PropertiesRepository>();
builder.Services.AddScoped<ISearchRepository<Propiedade>, SearchRepository>();
builder.Services.AddScoped<IJwtServiceRepository, JwtServiceRepository>();
builder.Services.AddSingleton<IAlmacenarArchivos, AlmacenarArchivos>();
builder.Services.AddScoped <IGenericRepository <MessageResponse>, MessageRepository>();
 
builder.Services.AddHttpContextAccessor();
builder.Services.AddSignalR();
builder.Services.AddControllers().AddJsonOptions(opt =>
{
    opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});
var misReglasCors = "ReglasCors";
builder.Services.AddCors(opt =>
{   // configurar cors
    opt.AddPolicy(name: misReglasCors, builder =>
    {
        builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});
var key = builder.Configuration.GetValue<string>("JwtSetting:Key");
var keyBytes = Encoding.ASCII.GetBytes(key);

builder.Services.AddAuthentication(config =>
{
    config.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    config.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(config =>
{
    config.RequireHttpsMetadata = false;
    config.SaveToken = true;
    config.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
    config.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            var accessToken = context.Request.Query["access_token"];
 
            // If the request is for our hub...
            var path = context.HttpContext.Request.Path;
            if (!string.IsNullOrEmpty(accessToken) &&
                (path.StartsWithSegments("/websocket")))
            {
                // Read the token out of the query string
                context.Token = accessToken;
            }
            return Task.CompletedTask;
        }
    };
});

var app = builder.Build();
 

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.MapHub<SignalRClass>("/websocket");
app.UseCors(misReglasCors);
app.UseAuthentication();
app.UseAuthorization();
app.UseStaticFiles();
app.MapControllers();

app.Run();
