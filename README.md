# remix-supabase-app

Remix + Supabase + Cloudflare application.

- Remix (Client and server)
- Conform (Form library)
- shadcn/ui (UI development)
- Supabase
- Prisma (DB schema management)

## Server setup

Running docker and below start supabase cli.

```
npx suppase start
```

Setup your Supabase environment. 

.env

```bash
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:54322/postgres"
DIRECT_URL="postgresql://postgres:postgres@127.0.0.1:54322/postgres"
SUPABASE_URL="http://127.0.0.1:54321"
SUPABASE_ANON_KEY="your-Key"
```

Start supabase db rest and Push prisma db push.

```bash
npx supabase db reset && npx prisma db push
```

## Client setup

Install npm dependcies.

```bash
npm install
```

and start dev server

```bash
npm run dev
```