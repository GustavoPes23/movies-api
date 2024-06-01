export interface UserCreateInputDto {
  readonly name: string;
  readonly email: string;
  readonly login: string;
  readonly password: string;
}

export interface UserCreateOutputDto {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly login: string;
  readonly createdAt: string;
}
