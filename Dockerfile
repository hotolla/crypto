FROM node:18-alpine AS development

# ENV PROXY START (https://caprover.com/docs/app-configuration.html#environment-variables)

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

ARG NEXT_PUBLIC_FREE_CURRENCY_API_KEY
ENV NEXT_PUBLIC_FREE_CURRENCY_API_KEY=$NEXT_PUBLIC_FREE_CURRENCY_API_KEY

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# ENV PROXY END

WORKDIR /app
COPY package*.json ./

RUN npm ci --include=dev --legacy-peer-deps

COPY . .

RUN npm run build

CMD npm start
