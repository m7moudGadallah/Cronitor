const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = {
  prisma,
  connect: async () => {
    try {
      await prisma.$connect();
      // Enable foreign key enforcement for SQLite
      await prisma.$executeRaw`PRAGMA foreign_keys = ON`;
      console.log('Connected to database with foreign keys enabled');
    } catch (error) {
      console.error('Database connection error:', error);
      process.exit(1);
    }
  },
  disconnect: async () => {
    await prisma.$disconnect();
  },
};
