import dotenv from 'dotenv';
dotenv.config();

const devConfig = {
  port: process.env.PORT || 3200,
  host: process.env.HOST || 'localhost',
  db_host: process.env.DB_HOST || 'mongodb://localhost/',
  db_name: process.env.DB_NAME || 'crm_dev_db',
};

export default devConfig;