export interface DatabaseConfig {
  host: string;
  port: number;
  name: string;
  user: string;
  pass: string;
  auth: string;
}

export interface QueueConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  hearbeat: number
}

export interface TokenConfig {
  secret: string;
  expire: number;
}

export interface Config {
  host: string,
  port: number,
  token: TokenConfig,
  database: {
    mongo: DatabaseConfig
  },
  queue: {
    rabbit: QueueConfig
  }
}

export default (): Config => ({
  host: process.env.APP_HOST || 'http://localhost:3000',
  port: parseInt(process.env.NODE_PORT, 0) || 3000,
  token: {
    secret: process.env.TOKEN_SECRET,
    expire: parseInt(process.env.TOKEN_EXPIRE, 0) || 3600
  },
  database: {
    mongo: {
      host: process.env.DB_MONGO_HOST || '127.0.0.1',
      port: parseInt(process.env.DB_MONGO_PORT, 0) || 27017,
      name: process.env.DB_MONGO_DATABASE,
      user: process.env.DB_MONGO_USERNAME,
      pass: process.env.DB_MONGO_PASSWORD,
      auth: process.env.DB_MONGO_AUTH_SOURCE
    },
  },
  queue: {
    rabbit: {
      host: process.env.RABBIT_MQ_HOST || '127.0.0.1',
      port: parseInt(process.env.RABBIT_MQ_PORT, 0) || 5672,
      user: process.env.RABBIT_MQ_USERNAME,
      pass: process.env.RABBIT_MQ_PASSWORD,
      hearbeat: parseInt(process.env.RABBIT_MQ_HEAR_BEAT, 0) || 60
    }
  }
});