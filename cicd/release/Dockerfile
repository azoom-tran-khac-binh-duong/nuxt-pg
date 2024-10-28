FROM node:18-alpine AS build-stage

RUN npm install -g pnpm
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .
RUN pnpm build

# FROM node:18-alpine
# WORKDIR /app
# COPY --from=build-stage /app/.output /app/.output

EXPOSE 3000
CMD [ "node", ".output/server/index.mjs" ]
