import { Role } from "./roles.enum";

export interface User {
    userId: string;
    name: string;
    role: Role;
    isAuthenticated: boolean;
    picture: string;
}