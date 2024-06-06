export default () => ({
  app: {
    port: parseInt(process.env.PORT, 10) || 3000,
    version: '1.0.0',
  },
  jwt: {
    access: {
      secret: process.env.ACCESS_TOKEN_SECRET,
      exp: process.env.ACCESS_TOKEN_EXPIRATION,
    },
    refresh: {
      secret: process.env.REFRESH_TOKEN_SECRET,
      exp: process.env.REFRESH_TOKEN_EXPIRATION,
    },
  },
  swagger: {
    title: 'Simple Blog API Docs',
    description: 'This provides comprehensive documentation for todos API',
    path: 'api-docs',
    theme: 'dark',
  },
  mongo: {
    url: process.env.MONGO_URL,
  },
});
