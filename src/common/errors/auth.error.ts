
export class AuthError extends Error{
  private statusCode: number;

  constructor(message:string, statusCode: number){
    super(message)
    this.name = 'AuthError'
    this.statusCode = statusCode
  }
}