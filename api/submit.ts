/**
 * POST /api/submit
 * Saves a contact form submission to Neon PostgreSQL.
 * Vercel serverless function — auto-deployed alongside the frontend.
 */
import { neon } from '@neondatabase/serverless'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const DATABASE_URL = process.env.DATABASE_URL
  if (!DATABASE_URL) {
    return res.status(503).json({
      error: 'Database not configured.',
      hint: 'Add DATABASE_URL to Vercel Environment Variables (Settings → Environment Variables).',
    })
  }

  const sql = neon(DATABASE_URL)

  try {
    const { name, email, phone, company, service, message } = req.body ?? {}

    if (!name?.trim() || !email?.trim()) {
      return res.status(400).json({ error: 'Name and email are required.' })
    }

    // Create table if it doesn't exist (idempotent)
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

    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim()
              || (req.socket as { remoteAddress?: string })?.remoteAddress
              || null

    const result = await sql`
      INSERT INTO contact_submissions (name, email, phone, company, service, message, ip_address)
      VALUES (${name}, ${email}, ${phone || null}, ${company || null}, ${service || null}, ${message || null}, ${ip})
      RETURNING id, created_at
    `

    return res.status(200).json({ success: true, id: result[0].id, created_at: result[0].created_at })
  } catch (err: unknown) {
    console.error('[/api/submit] DB error:', err)
    return res.status(500).json({ error: 'Failed to save submission. Please try again.' })
  }
}
