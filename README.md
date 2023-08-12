# Homepage
*a simple "desktop" webpage*

# Features 
### Completed Features
### Desired Features
- Cities Table
  - City, Time, Cond.,	Temp, Humid.
  - Chicago
  - Atlanta (dropdown)
  - Osaka (dropdown)
- financial data live updates
  - S&P
  - Dow Jones
  - 
  - track a portfolio entered by the user
- task tracker
- photo album (list of links)
- news feed (embededd page)

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
docker-compose --compatibility up
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
- docker-compose build/rebuild: https://betterstack.com/community/questions/how-to-rebuild-docker-container-in-docker-compose/
- adding mysql container to compose: https://medium.com/@chrischuck35/how-to-create-a-mysql-instance-with-docker-compose-1598f3cc1bee
- mysql in Ubuntu fails to connect with just mysql-client: https://stackoverflow.com/questions/11657829/error-2002-hy000-cant-connect-to-local-mysql-server-through-socket-var-run
- mysql denies hosts: https://serverfault.com/questions/793058/can-not-access-mysql-docker
- `--compatibility` required in newer docker-compose to use old name schemd : https://stackoverflow.com/questions/69464001/docker-compose-container-name-use-dash-instead-of-underscore