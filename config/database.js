const parse = require("pg-connection-string").parse;

module.exports = ({ env }) => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const config = parse(process.env.DATABASE_URL);

  return {
    connection: {
      client: "postgres",
      connection: {
        host: config.host,
        port: config.port,
        database: config.database,
        user: config.user,
        password: config.password,
        ssl: {
          rejectUnauthorized: false,
        },
      },
      debug: false,
    },
  };
};