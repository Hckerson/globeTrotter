import { User } from "../models/user";
import { AllUserLookUp } from "../common/interface/user.interface";

export class UserRepository {
  private users: typeof User;
  constructor() {
    this.users = User;
  }

  async fetchAllUsers(userLookup: AllUserLookUp) {
    try {
      const response = await this.users.find();
      return response;
    } catch (error) {
      console.error("Error fetching all users", error);
      throw error;
    }
  }
}


