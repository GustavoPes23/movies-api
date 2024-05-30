export interface UserLoginInputDto {
  readonly login: string;
  readonly password: string;
}

export interface UserLoginOutputDto {
  readonly token: string;
}
