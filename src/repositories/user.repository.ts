import { User } from "../models/user";
import { logger } from "../lib/logger";
import { AllUserLookUp } from "../common/interface/user.interface";
import { RegisterUserDto } from "../common/dto/user.dto";

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
      logger.error("Error fetching all users", error);
      throw error;
    }
  }

  async findUserByEmail(email: string) {
    try {
      const response = await this.users.findOne({ email });
      return response;
    } catch (error) {
      logger.error("Error fetching user by email", error);
      throw error;
    }
  }

  async createNewUser(createUserDto: RegisterUserDto) {
    try {
      const response = await this.users.create(createUserDto);
      return response;
    } catch (error) {
      logger.error("Error creating new user", error);
      throw error;
    }
  }

  async updateUserById(id: string, data: any) {
    try {
      const response = await this.users.findOneAndUpdate({ _id: id }, data);
      return response;
    } catch (error) {
      logger.error("Error updating user by id", error);
      throw error;
    }
  }
}
