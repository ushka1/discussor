# Discussor backend

Discussor is an application that allows users to create and participate in live topic-based discussions. This repository contains the backend of the application.

## Requirements

- Node.js (>=20)
- Docker
- LiveKit ([installation guide](https://docs.livekit.io/realtime/self-hosting/local/))

## Getting started

1. Clone the repository and run `npm install` to install the dependencies.
1. Copy `env.example` to `.env` and fill in the environment variables. To generate the `JWT_SECRET`, you can use [`generate-secret.sh`](./generate-sercret.sh) script.
1. Run `docker-compose up` to start the MongoDB container.
1. Run [`livekit-start.sh`](./livekit-start.sh) to start the LiveKit dev server.
1. Run `npm dev` to start the development server with active linting and typecheck.
1. The API will be available at <http://localhost:8080> and the API documentation at <http://localhost:8080/api-docs>.

## Features

- [TypeScript](https://www.typescriptlang.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Typegoose](https://typegoose.github.io/typegoose/) (MongoDB ODM)
- [SwaggerJSDoc](https://www.npmjs.com/package/swagger-jsdoc) (API documentation)
- [LiveKit](https://livekit.io/) (WebRTC stack)
