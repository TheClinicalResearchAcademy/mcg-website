# Deploy to Vercel — Step-by-Step Guide

This project is configured to deploy to **Vercel** with **Neon Postgres** for storage and **Resend** for email delivery.

---

## Step 1: Create accounts (all free)

1. **GitHub** — https://github.com (you already have one)
2. **Vercel** — https://vercel.com (sign in with GitHub)
3. **Neon** — https://neon.tech (free Postgres)
4. **Resend** — https://resend.com (3,000 free emails/month)

---

## Step 2: Push the code to GitHub

In Replit's Shell tab, run:

```bash
git init
git add .
git commit -m "Initial commit - Monache Consulting Group website"
```

Then create a new repo on github.com (call it something like `mcg-website`), and run:

```bash
git remote add origin https://github.com/YOUR-USERNAME/mcg-website.git
git branch -M main
git push -u origin main
```

---

## Step 3: Set up Neon Postgres

1. Go to https://console.neon.tech and create a new project
2. Copy the **connection string** (looks like `postgresql://user:pass@ep-xxx.neon.tech/neondb`)
3. Save it — you'll paste it into Vercel in Step 5

---

## Step 4: Set up Resend

1. Go to https://resend.com and create an account
2. Go to **API Keys** → **Create API Key** → copy it
3. (Optional but recommended) **Add Domain** → enter `monacheconsultinggroup.com`
   - Resend will give you DNS records to add at GoDaddy
   - Once verified, you can send from `noreply@monacheconsultinggroup.com`
   - **For testing first**, you can use `onboarding@resend.dev` (Resend's shared sender)

---

## Step 5: Deploy to Vercel

1. Go to https://vercel.com/new
2. Click **Import Project** → select your GitHub repo
3. Vercel auto-detects the build settings from `vercel.json` (don't change anything)
4. Click **Environment Variables** and add these four:

   | Key | Value |
   |---|---|
   | `DATABASE_URL` | (paste the Neon connection string) |
   | `RESEND_API_KEY` | (paste the Resend API key) |
   | `RESEND_FROM_EMAIL` | `onboarding@resend.dev` (or your verified domain email) |
   | `ADMIN_PASSWORD` | (choose a strong password for `/admin` access) |

5. Click **Deploy** — wait ~2 min
6. Visit your `*.vercel.app` URL to confirm it works

---

## Step 6: Initialize the database

In Replit Shell (one time, with your Neon `DATABASE_URL` in place of the Replit one):

```bash
npm run db:push
```

Or, alternative: clone the repo locally, set `DATABASE_URL` in `.env`, and run `npm run db:push` there.

The schema is already pushed to your current Replit Neon DB. For Vercel, you'll need the same schema on the Vercel-connected Neon DB. Easiest: just point Vercel to the **same** Neon database you use in Replit (paste the same `DATABASE_URL`).

---

## Step 7: Connect monacheconsultinggroup.com (GoDaddy DNS)

1. In Vercel: **Settings** → **Domains** → **Add** → enter `monacheconsultinggroup.com` and `www.monacheconsultinggroup.com`
2. Vercel will show you DNS records to add (typically an A record `76.76.21.21` and a CNAME for www)
3. In **GoDaddy**: log in → My Products → DNS for monacheconsultinggroup.com
4. Add the A record and CNAME records exactly as Vercel shows them
5. Wait 5-30 min for DNS to propagate
6. Visit https://monacheconsultinggroup.com — done! 🎉

---

## Step 8: Test the email flow

1. Go to your live site `/about` page
2. Click "Download Our One-Pager" → "Request Access" → submit
3. Go to `/admin`, sign in with your `ADMIN_PASSWORD`
4. Click **Approve & Issue Code** on the test request
5. The recruiter receives an email with their authorization code
6. They use it on the site to download

---

## Troubleshooting

- **Emails not sending?** Check Vercel logs → Resend's free tier blocks sending to addresses other than your own verified one until you verify a domain.
- **Database errors?** Make sure `DATABASE_URL` in Vercel matches a Neon DB that has the schema pushed (`npm run db:push`).
- **DNS not working?** Wait 30 min, then check https://dnschecker.org

---

## Local Development (Replit)

Everything still works locally. The app uses:
- Replit's Neon DB if `DATABASE_URL` is set, otherwise in-memory storage
- Resend if `RESEND_API_KEY` is set, otherwise logs codes to console
