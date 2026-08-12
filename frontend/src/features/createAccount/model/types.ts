export interface SignUpFormData {
    newUsername: string,
    newPassword: string,
    confirmNewPassword: string,
}

export interface SignUpFormResponse {
    token: string
    username: string
}

export interface SignUpFormDataCredentials {
    username: string,
    password: string,
}

