import { Response } from "express";
import { User } from "../../models/user";
import { RegisterUserDto } from "../../common/dto/user.dto";
import { AuthError } from "../../common/errors/auth.error";

export class AuthService {
  private user: typeof User;
  constructor() {
    this.user = User;
  }

  async register(res: Response, registerDto: RegisterUserDto) {
    const { email = "" } = registerDto;

    // find existing user
    const existingUser = await this.user.findOne({ email });

    if (existingUser)
      return res
        .json({
          message: "User already exists",
          data: existingUser,
        })
        .status(409);

    const user = await this.user.create(registerDto);

    if(user){
      const email = user.email;
    }
    try {
    } catch (error) {
      console.error("Error registering user");
      throw new AuthError("Error registering user");
    }
  }
}
