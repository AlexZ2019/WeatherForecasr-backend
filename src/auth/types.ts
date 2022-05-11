export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export interface UserPayload {
  id: number
  email: string
}

declare namespace Express {
  export interface Request {
    user: any;
  }
}
