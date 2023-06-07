module.exports = {
  env: 'development',
  databaseUrl:
    process.env.CP_MONGO_URL || 'mongodb://localhost:27017/cboard-phrase-api',
  port: 10010,
  GOOGLE_ANALYTICS_SERVICE_ACCOUNT_CREDENTIALS:
    process.env.GOOGLE_ANALYTICS_SERVICE_ACCOUNT_CREDENTIALS,
  GA_CLIENT_EMAIL: process.env.GA_CLIENT_EMAIL,
  GA_PRIVATE_KEY: process.env.GA_PRIVATE_KEY,
};
