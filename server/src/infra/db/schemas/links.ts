import { numeric, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { uuidv7 } from 'uuidv7'

export const links = pgTable('links', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  originalUrl: text('original_url').notNull(),
  shortenedUrl: text('shortened_url').notNull().unique(),
  accessCount: numeric('access_count', { precision: 10, scale: 0 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
