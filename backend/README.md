# Discussor backend

This is the backend for the Discussor project, an application that allows users to create and participate in live discussions.

## Technologies

- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [LiveKit](https://livekit.io/)

## Getting started

1. Clone the repository and run `npm install` to install the dependencies.
1. Copy `env.example` to `.env` and fill in the environment variables. To generate the `JWT_SECRET`, you can use [`generate-secret.sh`](./generate-sercret.sh) script.
1. Run `docker-compose up` to start the MongoDB container.
1. Install and start LiveKit instance following this [guide](https://docs.livekit.io/realtime/self-hosting/local/).
1. Run `npm dev` to start the development server with active linting and typecheck.
1. The API will be available at <http://localhost:8080> and the documentation at <http://localhost:8080/api-docs>.
