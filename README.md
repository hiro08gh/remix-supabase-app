# remix-supabase-app

- Remix
- Supabase
- shadcn/ui
- Prisma

.env

```bash
DATABASE_URL="postgresql://postgres.project_id:user_pass@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres"
DIRECT_URL="postgresql://postgres.project_id:user_pass@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres"
SUPABASE_URL=""
SUPABASE_ANON_KEY=""
```

Push Supabase database.

```bash
npx prisma db push
```

Add Supabase SQL  functions.

```bash
begin
  insert into public."User" (email)
  values (new.email);
  return new;
end;
```
