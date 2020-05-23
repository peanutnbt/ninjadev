const dbConfig = {};
dbConfig.postgres = {};
dbConfig.mongoDB = {};

//Postgre
dbConfig.postgres.options =  {

  // host: 'postgres-instance.c83wlg8kta31.us-east-2.rds.amazonaws.com',
  host:'ec2-54-225-96-191.compute-1.amazonaws.com',

  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    freezeTableName: true
  },
  "ssl": true,
  "dialectOptions": {
    "ssl": true
  }
  // SQLite only
  //storage: 'path/to/database.sqlite'
};


dbConfig.postgres.dbName = 'df65jrafdnh2t7';
dbConfig.postgres.user = 'sihzenawmfvmnq';
dbConfig.postgres.password = 'e52ce3940dd42f1b87dc79d8e2ce46edf136342426655ad2fc0ebe2b6e75a65e';




//Mongo

dbConfig.mongoDB = 'mongodb://localhost/tutorVNLogin';

module.exports = dbConfig;
