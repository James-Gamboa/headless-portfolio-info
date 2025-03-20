const parse = require('pg-connection-string').parse;
const config = parse(process.env.DATABASE_URL);

module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
      ssl: env.bool('DATABASE_SSL', true) ? {
        rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false),
      } : false,
      connectionTimeoutMillis: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
    pool: {
      min: env.int('DATABASE_POOL_MIN', 2),
      max: env.int('DATABASE_POOL_MAX', 10),
      idleTimeoutMillis: env.int('DATABASE_IDLE_TIMEOUT', 30000),
      createTimeoutMillis: env.int('DATABASE_CREATE_TIMEOUT', 30000),
      acquireTimeoutMillis: env.int('DATABASE_ACQUIRE_TIMEOUT', 30000),
    },
    debug: env.bool('DATABASE_DEBUG', false),
  },
});