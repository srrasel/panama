FROM node:20-bullseye-slim AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files and lockfile, install deps but skip lifecycle scripts
# (we'll run `postinstall` after copying the full project so Prisma schema exists)
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --no-frozen-lockfile --ignore-scripts

# Copy project files and run postinstall (prisma generate) then build
COPY . .
RUN pnpm run postinstall && pnpm run build

FROM node:20-bullseye-slim AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy app build and production files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# Expose port and run using npm (no pnpm required at runtime)
EXPOSE 3000
CMD ["npm", "run", "start"]
