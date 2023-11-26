import { prisma } from "../db";

export class UserRepository {

  static ADMIN = 1;
  static NORMAL_USER = 2;
  
  async getUser(user: any): Promise<any> {}

  async createUser(userData: any): Promise<any> {
    return prisma.user.create({
      data: userData,
    });
  }
}
