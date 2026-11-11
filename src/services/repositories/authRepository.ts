import { wait } from './baseRepository';

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload extends AuthCredentials {
  name: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface AuthSession {
  user: AuthUser;
  token: string;
  refreshToken: string;
}

export const authRepository = {
  async login(credentials: AuthCredentials): Promise<AuthSession> {
    const mockSession: AuthSession = {
      user: {
        id: 'user_001',
        email: credentials.email,
        name: 'Eco User',
      },
      token: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
    };

    return wait(mockSession, 400);
  },

  async register(payload: RegisterPayload): Promise<AuthSession> {
    const mockSession: AuthSession = {
      user: {
        id: 'user_002',
        email: payload.email,
        name: payload.name,
      },
      token: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
    };

    return wait(mockSession, 450);
  },

  async logout(): Promise<void> {
    await wait(undefined, 200);
  },
};
