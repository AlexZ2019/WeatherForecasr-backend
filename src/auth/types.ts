export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

declare namespace Express {
  export interface Request {
    user: any;
  }
}
