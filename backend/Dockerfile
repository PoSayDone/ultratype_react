FROM mcr.microsoft.com/dotnet/sdk:7.0 AS base
WORKDIR /usr/src/app
COPY backend.csproj .
RUN dotnet restore "./backend.csproj"
COPY . .
RUN dotnet publish -c Release -o /usr/src/app/publish

FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /usr/src/app
COPY --from=base /usr/src/app/publish .
