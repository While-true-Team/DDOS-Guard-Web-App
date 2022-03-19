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
}

interface RegistrationRequest {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}

export type {AuthorizeResponse, LoginRequest, RegistrationRequest}