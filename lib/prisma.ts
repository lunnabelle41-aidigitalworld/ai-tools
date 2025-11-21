// Mock Prisma client to match the expected interface for the login API
import { db } from './db';

// Mock Prisma client that uses our existing db functions
const prisma = {
  user: {
    findUnique: async ({ where, select }: { where: { id?: string; email?: string }; select?: any }) => {
      let user = null;
      
      if (where.email) {
        user = await db.findUserByEmail(where.email);
      }
      if (where.id) {
        user = await db.findUserById(where.id);
      }
      
      // If select is specified, only return the selected fields
      if (user && select) {
        const selectedUser: any = {};
        for (const key in select) {
          if (select[key] === true && user.hasOwnProperty(key)) {
            selectedUser[key] = user[key as keyof typeof user];
          }
        }
        return selectedUser;
      }
      
      return user;
    },
    create: async ({ data }: { data: any }) => {
      const userData = {
        ...data,
        isTwoFactorEnabled: false,
        twoFactorSecret: '',
        backupCodes: [],
      };
      
      const newUser = await db.createUser(userData);
      return newUser;
    }
  }
};

export { prisma };