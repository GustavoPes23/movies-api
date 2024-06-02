export interface UserFindByIdInputDto {
  readonly id: string;
  readonly token: string;
}

export interface UserFindByIdOutputDto {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly login: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
