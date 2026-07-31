export interface LoginFormData {
    username: string,
    password: string,
}

export interface LoginFormResponse {
    token: string
    username: string
}