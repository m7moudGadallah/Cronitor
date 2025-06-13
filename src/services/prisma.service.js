const { PrismaClient } = require('../generated/prisma');
const logger = require('./logger.service');

const prisma = new PrismaClient();

module.exports = {
  prisma,
  connect: async () => {
    try {
      await prisma.$connect();
      // Enable foreign key enforcement for SQLite
      await prisma.$executeRaw`PRAGMA foreign_keys = ON`;
      logger.info('Connected to database with foreign keys enabled');
    } catch (error) {
      logger.error('Database connection error:', error);
      throw error;
    }
  },
  disconnect: async () => {
    await prisma.$disconnect();
    logger.warning('Disconnect database');
  },
};
