interface AuthorizeResponse {
    access_token: string;
    refresh_token: string;
}

interface LoginRequest {
    login: string;
    password: string;
}

type RegistrationRequest = LoginRequest;

export type {AuthorizeResponse, LoginRequest, RegistrationRequest}