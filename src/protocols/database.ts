import { Knex } from 'knex'

export namespace Database {
  export interface Connection {

  }

  export interface Builder<TRecord extends object = any, TResult = TRecord[]>
    extends Knex.QueryInterface<TRecord, TResult> {

  }
}
