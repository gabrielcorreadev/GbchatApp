import { User } from './user';

export interface DataSession {
    user: User;
    access_token: string;
    token_type: string;
    expires_in: number;
}
