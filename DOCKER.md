# Docker image (local)

Build the image from the project root:

```bash
docker build -t modern-lms:latest .
```

Run the container (example, set `DATABASE_URL` and any other envs):

```bash
docker run -p 3000:3000 \
  -e DATABASE_URL='postgresql://user:pass@host:5432/db' \
  -e NEXT_PUBLIC_API_URL='https://api.example' \
  modern-lms:latest
```

Notes:
- The image builds in a multi-stage pipeline; the build stage installs dev dependencies (so `@prisma/client` present if it's in devDependencies).
- If you get runtime errors about `@prisma/client` not found, move `@prisma/client` into `dependencies` (not `devDependencies`) in `package.json` and rebuild.
- If you rely on native Prisma binaries, using the Debian-slim base (`node:20-bullseye-slim`) helps avoid musl/glibc compatibility issues.

Development
-----------

To run the app in development mode (hot-reload) using Docker Compose:

```bash
docker compose -f docker-compose.dev.yml up --build
```

This mounts your project into the container so edits on the host are reflected immediately.
