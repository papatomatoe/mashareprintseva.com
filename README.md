# mashareprintseva.com

## Install dependencies

```bash
bun install
```

## Configure local database

1. Add envs:

```.env
  DATABASE_URL=postgresql://<DB_USER>:<DB_PASSWORD>@localhost:5432/<DB_NAME>

  DB_NAME=
  DB_USER=
  DB_PASSWORD=
```

1. Start local docker container

```bash
docker compose -f docker-compose.yml up -df
```

1. Run db migration

```bash
 bunx prisma migrate dev --name new
```

1. Run prisma studio

```bash
bunx prisma studio
```

## Start dev server

```bash
bun dev
```
