FROM mcr.microsoft.com/dotnet/sdk:7.0 AS base
WORKDIR /app
COPY backend.csproj .
RUN dotnet restore "./backend.csproj"
COPY . .
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=base /app/publish .
ENTRYPOINT ["dotnet", "backend.dll"]