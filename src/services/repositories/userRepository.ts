import { wait } from './baseRepository';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'member' | 'admin';
  createdAt: string;
}

export const userRepository = {
  async getProfile(): Promise<UserProfile> {
    const profile: UserProfile = {
      id: 'user_001',
      name: 'Eco User',
      email: 'eco.user@example.com',
      role: 'member',
      createdAt: '2026-01-01T00:00:00.000Z',
    };

    return wait(profile, 300);
  },

  async list(): Promise<UserProfile[]> {
    const profiles: UserProfile[] = [
      {
        id: 'user_001',
        name: 'Eco User',
        email: 'eco.user@example.com',
        role: 'member',
        createdAt: '2026-01-01T00:00:00.000Z',
      },
      {
        id: 'user_002',
        name: 'Admin Eco',
        email: 'admin.eco@example.com',
        role: 'admin',
        createdAt: '2026-01-02T00:00:00.000Z',
      },
    ];

    return wait(profiles, 300);
  },
};
