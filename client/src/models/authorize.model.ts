interface AuthorizeResponse {
    access: string;
    // TODO ниже старая нотация токена
    tokens: {
        access: string;
    }
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

export type {AuthorizeResponse, LoginRequest, RegistrationRequest}