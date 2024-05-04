declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;

    DB_CONNECT_URI: string;
    DB_NAME: string;
    DB_PASSWORD: string;
    DB_USERNAME: string;
    DB_AUTH_SOURCE: string;

    JWT_SECRET: string;
  }
}

declare namespace Express {
  export interface Request {
    user?: import('./models/User').UserDocument;
  }
}
