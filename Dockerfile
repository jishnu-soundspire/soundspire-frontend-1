# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_PUBLIC_BASE_URL=https://localhost:3000
ENV NEXTAUTH_URL=https://localhost:3000

# Install openssl for certificate generation
RUN apk add --no-cache openssl

# Create certificates directory
RUN mkdir -p /app/certs

# Generate self-signed certificate
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /app/certs/localhost-key.pem \
    -out /app/certs/localhost.pem \
    -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

# Copy necessary files from builder
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/server.js ./
COPY --from=builder /app/node_modules ./node_modules

# Expose the port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider https://localhost:3000/api/health || exit 1

# Start the application
CMD ["node", "server.js"] 