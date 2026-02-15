# Deploying to Netlify

This project is a Next.js application using Prisma and SQLite. To deploy it successfully to Netlify (which uses serverless functions), you need to make some critical changes because Netlify's file system is **ephemeral** (read-only/temporary).

## ⚠️ Critical Changes Required

### 1. Database Migration (SQLite -> PostgreSQL)
SQLite saves data to a local file (`dev.db`). On Netlify, this file will be reset every time the serverless function restarts, causing **data loss**. You MUST switch to a cloud database.

**Recommended Providers:**
- [Neon](https://neon.tech) (Serverless Postgres)
- [Supabase](https://supabase.com)
- [Railway](https://railway.app)

**Steps:**
1.  Create a PostgreSQL database on one of the providers above.
2.  Get the `DATABASE_URL` connection string (e.g., `postgres://user:pass@host/db`).
3.  Update `prisma/schema.prisma`:
    ```prisma
    datasource db {
      provider = "postgresql" // Change from "sqlite"
      url      = env("DATABASE_URL")
    }
    ```
4.  Run migration locally:
    ```bash
    npx prisma db push
    ```

### 2. File Storage Migration (Local -> Cloud)
The current `lib/upload.ts` saves files to the `public/uploads` folder. On Netlify, these files will disappear after the request finishes. You MUST switch to cloud storage.

**Recommended Providers:**
- [UploadThing](https://uploadthing.com) (Easiest for Next.js)
- [Cloudinary](https://cloudinary.com)
- [AWS S3](https://aws.amazon.com/s3)
- [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)

**Action:**
You will need to rewrite `lib/upload.ts` to upload the file to your chosen provider and return the public URL.

## Deployment Steps

1.  **Push to GitHub/GitLab:** Ensure your code is in a remote repository.
2.  **Log in to Netlify:** Click "Add new site" -> "Import an existing project".
3.  **Connect Repository:** Select your repo.
4.  **Configure Build:**
    -   **Build Command:** `npm run build`
    -   **Publish Directory:** `.next`
5.  **Environment Variables:**
    -   Go to "Site settings" -> "Environment variables".
    -   Add `DATABASE_URL` (Your new PostgreSQL URL).
    -   Add `NEXTAUTH_SECRET` (Generate one using `openssl rand -base64 32`).
    -   Add any other API keys required by your storage provider.
6.  **Deploy:** Click "Deploy site".

## Notes
-   A `netlify.toml` file has been added to the project root to help Netlify detect the configuration.
-   The `package.json` has been updated with a `postinstall` script to ensure Prisma Client is generated during the build.
