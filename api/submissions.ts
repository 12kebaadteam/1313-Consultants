/**
 * GET /api/submissions
 * Returns all contact submissions from Neon PostgreSQL.
 * Protected by HTTP Basic Auth — credentials matched against env vars.
 * Vercel serverless function.
 */
import { neon } from '@neondatabase/serverless'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Authorization')
    return res.status(204).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // ── Basic Auth check ─────────────────────────────────────
  const authHeader = req.headers.authorization || ''
  if (!authHeader.startsWith('Basic ')) {
    return res.status(401).json({ error: 'Unauthorised' })
  }

  const decoded  = Buffer.from(authHeader.slice(6), 'base64').toString('utf-8')
  const colonIdx = decoded.indexOf(':')
  const user     = decoded.slice(0, colonIdx)
  const pass     = decoded.slice(colonIdx + 1)

  const ADMIN_USERNAME = process.env.VITE_ADMIN_USERNAME || 'admin1313'
  const ADMIN_PASSWORD = process.env.VITE_ADMIN_PASSWORD   // must be set in Vercel env

  if (!ADMIN_PASSWORD || user !== ADMIN_USERNAME || pass !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  // ── Database ─────────────────────────────────────────────
  const DATABASE_URL = process.env.DATABASE_URL
  if (!DATABASE_URL) {
    return res.status(503).json({
      error: 'Database not configured.',
      hint: 'Add DATABASE_URL to Vercel Environment Variables.',
    })
  }

  const sql = neon(DATABASE_URL)

  try {
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

    const rows = await sql`
      SELECT
        id,
        name,
        email,
        phone,
        company,
        service,
        message,
        ip_address,
        to_char(created_at AT TIME ZONE 'Europe/London', 'DD Mon YYYY, HH24:MI') AS date
      FROM contact_submissions
      ORDER BY created_at DESC
      LIMIT 500
    `

    return res.status(200).json({ submissions: rows, count: rows.length })
  } catch (err: unknown) {
    console.error('[/api/submissions] DB error:', err)
    return res.status(500).json({ error: 'Failed to fetch submissions' })
  }
}
