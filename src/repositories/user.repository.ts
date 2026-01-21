import { User } from "../models/user";

export class UserRepository {
  private users: typeof User;
  constructor() {
    this.users = User;
  }

  async fetchAllUsers() {
    try {
      const response = await this.users.find();
      return response;
    } catch (error) {
      console.error("Error fetching all users", error);
      throw error;
    }
  }
}


