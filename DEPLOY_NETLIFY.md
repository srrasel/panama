# Deploying to Netlify

This project is a Next.js application using Prisma (PostgreSQL) and Cloudinary for file storage.

## 🚀 Quick Start for Netlify

### 1. Database Setup (PostgreSQL)
Netlify functions are serverless and stateless. You cannot use SQLite (`dev.db`). You must use a cloud PostgreSQL database.

**Recommended Providers:**
- [Neon](https://neon.tech) (Serverless Postgres, highly recommended)
- [Supabase](https://supabase.com)
- [Railway](https://railway.app)

**Steps:**
1.  Create a PostgreSQL database.
2.  Get the Connection String (e.g., `postgres://user:pass@host/db?sslmode=require`).

### 2. File Storage Setup (Cloudinary)
Netlify functions have an ephemeral file system. Local uploads will disappear. This project is configured to automatically use Cloudinary if environment variables are present.

**Steps:**
1.  Create a free account at [Cloudinary](https://cloudinary.com).
2.  Go to your Dashboard and copy:
    -   Cloud Name
    -   API Key
    -   API Secret

### 3. Deploy to Netlify

1.  **Push to GitHub:** Ensure your latest code is pushed.
2.  **Import to Netlify:**
    -   Log in to Netlify -> "Add new site" -> "Import an existing project".
    -   Select your repository.
3.  **Build Settings (Auto-detected):**
    -   **Build Command:** `npm run build`
    -   **Publish Directory:** `.next`
4.  **Environment Variables (Crucial):**
    -   Go to "Site settings" -> "Environment variables" -> "Add a variable".
    -   Add the following:

    | Key | Value | Description |
    | :--- | :--- | :--- |
    | `DATABASE_URL` | `postgres://...` | Your PostgreSQL connection string. |
    | `NEXTAUTH_SECRET` | `(random string)` | Generate with `openssl rand -base64 32`. |
    | `CLOUDINARY_CLOUD_NAME` | `your_cloud_name` | From Cloudinary Dashboard. |
    | `CLOUDINARY_API_KEY` | `your_api_key` | From Cloudinary Dashboard. |
    | `CLOUDINARY_API_SECRET` | `your_api_secret` | From Cloudinary Dashboard. |

5.  **Deploy:** Click "Deploy site".

## 🛠 Project Configuration Details

-   **`netlify.toml`**: Configured to use `@netlify/plugin-nextjs`.
-   **`package.json`**: Includes `postinstall: "prisma generate"` to ensure Prisma Client is ready in the serverless environment.
-   **`lib/upload.ts`**: Automatically switches between local storage (dev) and Cloudinary (prod) based on environment variables.
-   **`prisma/schema.prisma`**: Configured for PostgreSQL and compatible binary targets (`rhel-openssl-1.0.x`, `rhel-openssl-3.0.x`).

## ⚠️ Troubleshooting

-   **Prisma Client Error:** If you see errors about "Prisma Client" not being found, ensure `postinstall` script ran successfully. usage of `npm install` on Netlify runs this automatically.
-   **Image Uploads Failing:** Check your Cloudinary credentials in Netlify Environment Variables.
-   **Database Connection:** Ensure your database provider allows connections from anywhere (0.0.0.0/0) or check Netlify's IP ranges (though 0.0.0.0/0 is standard for serverless).
