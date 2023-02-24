/* eslint-disable no-console */

import { Logger } from '@/protocols/logger'

type Level = 'info' | 'warn' | 'error'

function log(level: Level, ...args: unknown[]): void {
  const date = new Date().toISOString()
  console[level](`${date} [${level}]`, ...args)
}

export function makeLogger(): Logger {
  return {
    info(...args: unknown[]): void {
      log('info', ...args)
    },
    warn(...args: unknown[]): void {
      log('warn', ...args)
    },
    error(...args: unknown[]): void {
      log('error', ...args)
    }
  }
}
