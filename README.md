# Development Setup Guide

This guide explains how to set up and run the Modern LMS Landing Page project in development mode using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose installed
- Git installed

## Quick Start - Development Mode

### Option 1: Using Docker Compose (Recommended)

The easiest way to get started with hot-reload enabled:

```bash
# Navigate to project directory
cd modern-lms-landing-page

# Start development server with Docker Compose
docker compose -f docker-compose.dev.yml up --build
```

**Features:**
- ✓ Hot-reload enabled (code changes reflect immediately)
- ✓ Volume mounted for live editing
- ✓ Automatic environment variables from `.env` file

**Access the App:**
- Local: `http://localhost:3000`
- Network: `http://0.0.0.0:3000`

**Stop the Server:**
```bash
docker compose -f docker-compose.dev.yml down
```

---

### Option 2: Using Docker Run Command

If you prefer direct Docker commands without Compose:

```bash
# Build the Docker image
docker build -t modern-lms:dev .

# Run in development mode with volume mount for hot-reload
docker run -it \
  -p 3000:3000 \
  -v "$(pwd)":/app \
  -e NODE_ENV=development \
  --name lms-dev \
  modern-lms:dev \
  npm run dev -- --hostname 0.0.0.0
```

**Windows PowerShell:**
```powershell
docker run -it `
  -p 3000:3000 `
  -v "$PWD`:/app" `
  -e NODE_ENV=development `
  --name lms-dev `
  modern-lms:dev `
  npm run dev -- --hostname 0.0.0.0
```

**Features:**
- `-it`: Interactive terminal
- `-p 3000:3000`: Maps port 3000
- `-v`: Volume mount for live code editing
- `--hostname 0.0.0.0`: Makes app accessible externally

**Stop the Container:**
```bash
docker stop lms-dev
docker rm lms-dev
```

---

## Project Structure

```
modern-lms-landing-page/
├── app/                    # Next.js app directory
├── components/             # React components
├── public/                 # Static assets
├── styles/                 # Global styles
├── Dockerfile              # Production Docker setup
├── Dockerfile.dev          # Development Docker setup (if exists)
├── docker-compose.yml      # Production Compose config
├── docker-compose.dev.yml  # Development Compose config
└── package.json            # Dependencies and scripts
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000
# Add other environment variables as needed
```

---

## Common Development Tasks

### View Logs

```bash
# Docker Compose logs
docker compose -f docker-compose.dev.yml logs -f

# Follow specific service
docker compose -f docker-compose.dev.yml logs -f web
```

### Rebuild Container

```bash
# Rebuild and restart
docker compose -f docker-compose.dev.yml up --build
```

### Clean Everything

```bash
# Stop all containers
docker compose -f docker-compose.dev.yml down

# Remove images
docker rmi modern-lms:dev

# Remove volumes (WARNING: deletes data)
docker compose -f docker-compose.dev.yml down -v
```

### Access Container Shell

```bash
# While container is running
docker exec -it lms-dev /bin/bash

# Or with Compose
docker compose -f docker-compose.dev.yml exec web bash
```

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
```

### Hot-Reload Not Working
- Ensure volume mount is correctly configured: `-v "$(pwd)":/app`
- Check file system notifications are enabled
- Restart the container

### Module Not Found Errors
```bash
# Rebuild node_modules
docker compose -f docker-compose.dev.yml down
docker compose -f docker-compose.dev.yml up --build
```

### Clear Docker Cache
```bash
docker system prune -a
docker volume prune
```

---

## Building for Production

### Using Docker

```bash
# Build production image
docker build -t modern-lms:latest .

# Run production container
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  modern-lms:latest
```

### Using Docker Compose

```bash
docker compose up --build
```

---

## Docker Image Information

- **Base Image:** `node:20-bullseye-slim`
- **Working Directory:** `/app`
- **Exposed Port:** `3000`
- **Build Stages:** Multi-stage build (builder → runner)

---

## Next.js Development Features

- **Hot Module Replacement (HMR):** Instant updates without refresh
- **Fast Refresh:** Preserves component state during edits
- **Built-in ESLint:** Code quality checking
- **TypeScript Support:** Full type safety

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)

---

## Support

For issues or questions:
1. Check Docker logs: `docker compose logs -f`
2. Verify environment variables in `.env`
3. Ensure Docker daemon is running
4. Check port availability (default: 3000)

---

**Last Updated:** February 14, 2026  
**Next.js Version:** 15.5.12  
**Node Version:** 20 (Debian Bullseye)
