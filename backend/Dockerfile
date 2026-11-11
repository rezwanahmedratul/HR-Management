# Stage 1: Build NestJS application using Bun
FROM oven/bun:1-alpine AS builder

WORKDIR /app

COPY package.json bun.lock* ./
RUN bun install

COPY tsconfig*.json nest-cli.json ./
COPY src ./src

RUN bun run build

# Stage 2: Production runner
FROM oven/bun:1-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

# Install curl for container HEALTHCHECK
RUN apk add --no-cache curl

COPY package.json bun.lock* ./
RUN bun install --production

COPY --from=builder /app/dist ./dist

# Use non-root bun user
USER bun

EXPOSE 4000

HEALTHCHECK --interval=10s --timeout=5s --start-period=15s --retries=3 \
  CMD curl -f http://localhost:4000/api/health || exit 1

CMD ["bun", "dist/main.js"]
