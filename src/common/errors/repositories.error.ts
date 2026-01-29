export class UserRepoError extends Error {
  statusCode?: number;
  
  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = "UserRepoError";
    this.statusCode = statusCode;
  }
}
