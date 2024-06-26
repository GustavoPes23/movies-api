export interface UserLoginInputDto {
  readonly login: string;
  readonly password: string;
}

export interface UserLoginOutputDto {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly token: string;
}
