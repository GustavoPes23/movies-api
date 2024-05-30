import CreateUsecase from '../usecase/create/UserCreateUseCase';
import FindAllUsecase from '../usecase/findAll/UserFindAllUseCase';
import FindByIdUsecase from '../usecase/findById/UserFindByIdUseCase';
import Repository from "../../../infrastructure/user/repository/mongodb/UserRepositoryMondodb"
import UserUpdateUsecase from '../usecase/update/UserUpdateUseCase';
import UserLoginUseCase from '../usecase/login/UserLoginUseCase';
import TokenEntity from '../../token/entity/TokenEntity';

export default class UserFactory {
  static createUsecase() {
    return new CreateUsecase(new Repository(), new TokenEntity());
  }

  static findAllUsecase() {
    return new FindAllUsecase(new Repository());
  }

  static findByIdUsecase() {
    return new FindByIdUsecase(new Repository());
  }

  static updateUsecase() {
    return new UserUpdateUsecase(new Repository());
  }

  static loginUsecase() {
    return new UserLoginUseCase(new Repository());
  }
}
