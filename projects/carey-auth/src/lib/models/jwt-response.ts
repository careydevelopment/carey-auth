import { User } from 'carey-user';

export interface JwtResponse {
    token: string;
    expirationDate: number;
    user: User;
}
