// src/lib/db.ts
import { createClient } from '@libsql/client';

const client = createClient({
  url: import.meta.env.DATABASE_URL,
  authToken: import.meta.env.DATABASE_AUTH_TOKEN,
});

export default client;