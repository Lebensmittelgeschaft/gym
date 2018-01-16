export let config = {
  environment: process.env.NODE_ENV || 'Dev',
  database: {
    host: 'localhost',
    port: '27017',
    db: 'gym' + (process.env.NODE_ENV || 'Dev'),
  },
  server: {
    host: 'localhost',
    port: 3000,
  },
  /*client: {
    host: 'localhost',
    port: 4200,
  },
  redis: {
    host: 'localhost',
    port: 6379,
  },
  auth: {
    saml: {
      entryPoint: 'adfs_server',
      issuer: 'https://ltm_server/metadata.xml',
      callbackUrl: 'https://ltm_server/metadata.xml/callback',
      authnContext: 'http://schemas.microsoft.com/ws/2008/06/identity/authenticationmethod/windows',
      identifierFormat: null,
      signatureAlgorithm: 'sha1',
      acceptedClockSkewMs: -1,
    },
  },*/
};

