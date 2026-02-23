# @booze/se-db

A minimal, modern MongoDB CRUD library for Buydy server packages. All database configuration (URL, credentials, options) is injected from the top-level app—this package is agnostic to environment and credentials.

## Features
- Async CRUD operations for any collection
- No knowledge of DB URL, credentials, or schema
- Designed for dependency injection and testability
- ESM-first, clean API

## Usage

```js
import { MongoDbClient } from '@booze/se-db';

// Inject config from your app
const db = new MongoDbClient({
  url: process.env.MONGO_URL,
  dbName: 'buydy',
  options: { /* MongoClient options */ }
});

await db.connect();

// CRUD example
const user = await db.create('users', { email: 'test@booze.com' });
const found = await db.findOne('users', { email: 'test@booze.com' });
await db.update('users', { email: 'test@booze.com' }, { $set: { name: 'Test' } });
await db.delete('users', { email: 'test@booze.com' });

await db.disconnect();
```

## Philosophy
- **No config hardcoding**: All DB details are injected.
- **No schema enforcement**: Use with any collection/shape.
- **Testable**: Easily mock or swap DB in tests. 