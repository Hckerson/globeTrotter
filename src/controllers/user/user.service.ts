import { UserRepository } from "../../repositories/user.repository";

export class UserService {
  private userRepository: UserRepository;
  constructor(){
    this.userRepository = new UserRepository();
  }

  async getProfile(userId: string) {
    return this.userRepository.findUserById(userId);
  }

  async getAllUser(limit: string, page: string, search: string) {
    return this.userRepository.fetchAllUsers({ limit, page, search });
  }
}