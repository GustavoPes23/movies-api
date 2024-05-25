import UserEntity from "../entity/UserEntity";

import type BaseRepositoryInterface from "../../@shared/repository/BaseRepositoryInterface";

export default interface UserRepositoryInterface extends BaseRepositoryInterface<UserEntity> {}