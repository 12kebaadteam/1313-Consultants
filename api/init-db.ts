/**
 * GET /api/init-db
 * One-time endpoint to initialise the Neon database schema.
 * Run once after first deploy, then it's safe to call again (idempotent).
 *
 * Call with:
 *   curl https://your-project.vercel.app/api/init-db \
 *     -H "Authorization: Basic $(echo -n 'admin1313:147singhhh@' | base64)"
 */
import { neon } from '@neondatabase/serverless'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Auth check
  const authHeader = req.headers.authorization || ''
  if (!authHeader.startsWith('Basic ')) {
    return res.status(401).json({ error: 'Unauthorised' })
  }

  const decoded  = Buffer.from(authHeader.slice(6), 'base64').toString('utf-8')
  const colonIdx = decoded.indexOf(':')
  const user     = decoded.slice(0, colonIdx)
  const pass     = decoded.slice(colonIdx + 1)

  const ADMIN_USERNAME = process.env.VITE_ADMIN_USERNAME || 'admin1313'
  const ADMIN_PASSWORD = process.env.VITE_ADMIN_PASSWORD

  if (!ADMIN_PASSWORD || user !== ADMIN_USERNAME || pass !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const DATABASE_URL = process.env.DATABASE_URL
  if (!DATABASE_URL) {
    return res.status(503).json({ error: 'DATABASE_URL not configured in Vercel environment.' })
  }

  const sql = neon(DATABASE_URL)

  try {
    // Main table
    await sql`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id          SERIAL PRIMARY KEY,
        name        TEXT        NOT NULL,
        email       TEXT        NOT NULL,
        phone       TEXT,
        company     TEXT,
        service     TEXT,
        message     TEXT,
        ip_address  TEXT,
        created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `
    // Indexes for performance
    await sql`CREATE INDEX IF NOT EXISTS idx_submissions_email   ON contact_submissions(email)`
    await sql`CREATE INDEX IF NOT EXISTS idx_submissions_created ON contact_submissions(created_at DESC)`

    return res.status(200).json({
      success: true,
      message: '✅ Neon database schema initialised.',
      schema: {
        table: 'contact_submissions',
        columns: ['id', 'name', 'email', 'phone', 'company', 'service', 'message', 'ip_address', 'created_at'],
        indexes: ['idx_submissions_email', 'idx_submissions_created'],
      },
    })
  } catch (err: unknown) {
    console.error('[/api/init-db] error:', err)
    return res.status(500).json({ error: String(err) })
  }
}
