import 'dotenv/config';
import fs from 'fs';
import { drizzle } from 'drizzle-orm/node-postgres';
import { usersTable } from './schema';
const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  const users = JSON.parse(fs.readFileSync('./db/data/users.json', 'utf8'));
  await db.insert(usersTable).values(users);
  console.log('--- Seeded users ---');
}

main();