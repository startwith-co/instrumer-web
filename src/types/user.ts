export type UserRole = 'customer' | 'vendor';

export interface IUser {
  id: number;
  login: string;
  name: string;
  authorities: { name: string }[];
}
