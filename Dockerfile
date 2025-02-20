ARG IMAGE=node:20.13.1-alpine3.20
ARG WORKDIR=/usr/src/app
ARG WORKSPACE=apps/server

FROM ${IMAGE} as builder

ENV NODE_ENV production

ARG WORKDIR
ARG WORKSPACE

WORKDIR ${WORKDIR}

RUN --mount=type=bind,source=package.json,target=package.json \
  --mount=type=bind,source=package-lock.json,target=package-lock.json \
  --mount=type=cache,target=/root/.npm \
  --mount=type=bind,source=${WORKSPACE}/package.json,target=${WORKSPACE}/package.json \
  npm ci -w ${WORKSPACE} --include-workspace-root

COPY . .

RUN npm run build -w ${WORKSPACE}

FROM ${IMAGE}

ENV NODE_ENV production
ENV HOST 0.0.0.0

ARG WORKDIR
ARG WORKSPACE

WORKDIR ${WORKDIR}

RUN --mount=type=bind,source=package.json,target=package.json \
  --mount=type=bind,source=package-lock.json,target=package-lock.json \
  --mount=type=cache,target=/root/.npm \
  --mount=type=bind,source=${WORKSPACE}/package.json,target=${WORKSPACE}/package.json \
  npm ci --omit=dev -w ${WORKSPACE}

RUN echo '{ "type": "module" }' > package.json

USER node

COPY --from=builder ${WORKDIR}/${WORKSPACE}/dist .

EXPOSE 3000

CMD node index.js
