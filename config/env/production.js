module.exports = {
  env: 'production',
  databaseUrl:
    process.env.CP_MONGO_URL || 'mongodb://localhost:27017/cboard-phrase-api',
};
