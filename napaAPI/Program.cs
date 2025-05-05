using napaAPI.Data;
using Microsoft.EntityFrameworkCore;
using napaAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Register the database context
builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("NapaConnection")));
builder.Services.AddCors(option =>
{
    option.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:4200") 
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddHostedService<DailyVisitsCleanupService>(); // Register the background service

// Add controller support
builder.Services.AddControllers();

// Swagger for API documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Enable Swagger in development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors(); // Enable CORS

app.MapControllers();

app.Run();
