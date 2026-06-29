
export interface AuthUserResponse {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    role: string;
    status: string;
}

export interface AuthResponse {
    user: AuthUserResponse;
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
    refreshExpiresIn: number;
}

export interface TokenPayload {
  sub: string;
  email: string;
  phone?: string;
  role: string;
  status: string;
  jti: string;
}
