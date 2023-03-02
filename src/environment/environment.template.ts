export const environment = {
  jwtSecret: 'your super secret token of at least 32 characters', // update this with your own secret
  jwtExpiration: '1h', // you can change this if you want, some possible values: '1m', '1 day', '1000' (ms by default)
  connectionString: 'mongodb://localhost/combi-social', // make sure to use the proper connection string to the database
};
