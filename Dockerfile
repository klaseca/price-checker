ARG IMAGE=node:20.18.3-alpine3.20
ARG WORKDIR=/usr/src/app

FROM ${IMAGE} as builder

ENV NODE_ENV=development

ARG WORKDIR

WORKDIR ${WORKDIR}

RUN --mount=type=cache,target=/root/.npm \
  --mount=type=bind,source=package-lock.json,target=package-lock.json \
  --mount=type=bind,source=package.json,target=package.json \
  --mount=type=bind,source=apps/backend/package.json,target=apps/backend/package.json \
  --mount=type=bind,source=apps/frontend/package.json,target=apps/frontend/package.json \
  npm ci

COPY . .

RUN npm run build

FROM ${IMAGE}

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV DB_PATH=db/app.db
ENV DATABASE_URL=sqlite:${DB_PATH}
ENV DBMATE_MIGRATIONS_DIR=./migrations

ARG WORKDIR

WORKDIR ${WORKDIR}

RUN --mount=type=cache,target=/root/.npm \
  --mount=type=bind,source=package-lock.json,target=package-lock.json \
  --mount=type=bind,source=package.json,target=package.json \
  --mount=type=bind,source=apps/backend/package.json,target=apps/backend/package.json \
  npm ci --omit=dev -w apps/backend

RUN mkdir -p "$(dirname "$DB_PATH")"

COPY apps/backend ./
COPY --from=builder ${WORKDIR}/apps/backend/dist ./src/
COPY --from=builder ${WORKDIR}/apps/frontend/dist ./src/shared/infrastructure/http/public/

USER node

EXPOSE 3000

CMD npx dbmate up && node ./src/index.js
