using backend.Repositories;
using backend.Setting;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

BsonSerializer.RegisterSerializer(new GuidSerializer(MongoDB.Bson.BsonType.String));

builder.Services.AddSingleton<IMongoClient>(settingsProvider =>
{
    var setting = builder.Configuration.GetSection(nameof(MongoDbSetting)).Get<MongoDbSetting>();
    return new MongoClient(setting.ConnectionString);
});
builder.Services.AddSingleton<IUserRepository, MongoDBUserRepository>();
builder.Services.AddSingleton<ITestsRepository, MongoDBTestsRepository>();
builder.Services.AddControllers(options =>
{
    options.SuppressAsyncSuffixInActionNames = false;
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(MyAllowSpecificOrigins,
                          policy =>
                          {
                              policy.WithOrigins("*")
                                                  .AllowAnyHeader()
                                                  .AllowAnyMethod();
                          });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(MyAllowSpecificOrigins);
app.UseAuthorization();
app.MapControllers();
app.Run();
