import { Roles } from "../enums/role-enum";

export interface RegisterUserDto {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Roles;
  password: string;
}

export interface ReviewPostingDto {
  userId: string;
  rating: number;
  comment: string;
  destinationId: string;
}
