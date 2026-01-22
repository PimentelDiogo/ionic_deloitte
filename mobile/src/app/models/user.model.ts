export interface User {
    id: number;
    username: string;
    role: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    expiration: string;
}
