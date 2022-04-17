import { Sequelize } from 'sequelize'

export const sequelizeClient = new Sequelize( {
  database: process.env.PGDATABASE,
  username: process.env.PGUSERNAME,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: 5432,
  dialect: 'postgres',
});

export const queryInterface = sequelizeClient.getQueryInterface();

export default async function postgresConnection() {
  await sequelizeClient.sync()
    .then(() => console.log('Database connection has been established successfully.'))
    .catch(err => console.log('Unable to connect to the database:', err));
}
