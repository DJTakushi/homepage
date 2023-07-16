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

# Build & Run
In your dotnet environment:
```
cd homepage
dotnet run
```

# Development Resources
- c# dev with VSCode: https://code.visualstudio.com/docs/languages/csharp
- docker with C#: https://www.pluralsight.com/blog/software-development/how-to-build-custom-containers-docker
