const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Set to console.log to see raw SQL queries
    define: {
      timestamps: true, // This enables created_at and updated_at automatically
      underscored: true, // This converts camelCase to snake_case in the DB
    },
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Sequelize connected to MySQL successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };