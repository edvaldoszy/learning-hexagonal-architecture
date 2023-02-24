import { Database } from '@/protocols/database'
import makeKnex from 'knex'

export function makeDatabaseConnection(): Database.Builder {
  return makeKnex({
    client: 'mysql2',
    connection: {
      database: 'hexagonal_dev',
      host: '127.0.0.1',
      user: 'root',
      password: 'masterkey'
    }
  })
}
