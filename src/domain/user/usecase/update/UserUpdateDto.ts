export interface UserUpdateInputDto {
    readonly id: string;
    readonly token: string;
    readonly name?: string;
    readonly email?: string;
    readonly login?: string;
    readonly password?: string;
}

export interface UserUpdateOutputDto {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly login: string;
    readonly createdAt: string;
    readonly updatedAt: string;
}