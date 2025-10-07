export interface IPayload {
  email: string;
  role: string;
  password: string;
  _id:string
  iat?: number;
  exp?: number;
}

export interface IJwtService {
  generateRefreshToken(data: IPayload): Promise<string>;
  generateAccessToken(data: IPayload): Promise<string>;
  verifyJwtToken(token: string): Promise<IPayload>;
}