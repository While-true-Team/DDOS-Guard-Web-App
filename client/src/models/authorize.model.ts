interface AuthorizeResponse {
    access: string;
}

interface LoginRequest {
    email: string;
    password: string;
    showPassword?: boolean;
}

interface RegistrationRequest {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    showPassword?: boolean;
}

interface RegistrationResponse {
    message: string;
}

export type {AuthorizeResponse, LoginRequest, RegistrationRequest, RegistrationResponse}