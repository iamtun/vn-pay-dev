# Base image for all stages
FROM node:18-alpine AS base

# 1. Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* ./
RUN apk add --no-cache git libc6-compat \
    && yarn install --frozen-lockfile \
    && yarn cache clean

# 2. Build the application
FROM base AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY .env ./.env.production
# Build the application
RUN yarn build

# 3. Production image
FROM node:18-alpine AS runner

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production
# Copy other necessary files for running the application
COPY --from=builder /app ./

EXPOSE 3000
# Run the application
CMD ["yarn", "preview"]; 
