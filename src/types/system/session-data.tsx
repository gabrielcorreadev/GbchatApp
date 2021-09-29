import { User } from "./user";

export class SessionData {
    constructor(
        public user: User,
        public access_token: string,
    ) { }
}