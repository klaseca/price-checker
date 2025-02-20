# Price checker

Price monitoring application

## Application startup

### Create env files

```bash
cp ./apps/backend/.env.example ./apps/backend/.env
cp ./apps/frontend/.env.example ./apps/frontend/.env
```

Set up env variables in `.env` files

### Install dependencies

```bash
npm i
```

### Run migrations

Project uses dbmate for migrations, see [docs](https://github.com/amacneil/dbmate)

```bash
npm run migration up
```

### Run project for dev

```bash
npm run dev

# or run backend and frontend separately
# npm run dev:backend
# npm run dev:frontend
```
