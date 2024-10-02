# Capybara-Catalog

Due to the increasing capybara population in the zoo, the biologist specialized in large rodents encountered difficulties in managing the manual records of information about the animals. To solve this problem, an API was developed to efficiently organize this data.

## Instructions

### Requirements
- [WSL](https://docs.microsoft.com/pt-br/windows/wsl/install) (or any other Linux terminal)
- [Docker](https://www.docker.com/products/docker-desktop) (CLI or Docker Extension on VS Code)
- [Git](https://git-scm.com/downloads)

### Clone the repository
```bash
git clone https://github.com/Caua-Vinicius/Capybara-Catalog.git
```

### Run the project
```bash
cd Capybara-Catalog
docker compose up --build
docker exec -it backend-api npx prisma migrate deploy
```

### Notes
- If `docker compose up --build` doesn't work, try `docker-compose up --build`
- The command `docker exec -it backend-api npx prisma migrate deploy` applies Prisma migrations to the database. Make sure the service has started before running this command. Once applied, there is no need to run it again, as the MySQL volume will save the migration state.
- **Check the Logs!** When you see the following message, the API is ready to use:

```bash
 backend-api   | [Nest] 29  - 10/02/2024, 3:16:17 AM     LOG [NestApplication] Nest application successfully started +3ms
```