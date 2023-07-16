# Homepage
*a simple "desktop" webpage*

# Features 
### Completed Features
### Desired Features
- clocks
- financial data live updates
  - track a portfolio entered by the user
- weather - openApi
- task tracker
- photo album
- news feed

# Architecture
- docker-compose containers
  - web page (C# container)
  - finance server (python container)
  - openApi server (python container)
  - task database
  - photo server

# Build & Run All
In the repo head directory:
```
docker compose up
```
add `-d` option to run as *daemon* (I.E.: in the background)

Stop with
```
docker compose down
```

# Development Resources
- c# dev with VSCode: https://code.visualstudio.com/docs/languages/csharp
- docker with C#: https://www.pluralsight.com/blog/software-development/how-to-build-custom-containers-docker
- docker's .NET samples : https://docs.docker.com/samples/dotnet/
