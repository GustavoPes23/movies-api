import CreateUsecase from '../usecase/create/UserCreateUsecase';
import FindAllUsecase from '../usecase/findAll/UserFindAllUseCase';
import FindByIdUsecase from '../usecase/findById/UserFindByIdUseCase';
import Repository from "../../../infrastructure/user/repository/mongodb/UserRepositoryMondodb"

export default class UserFactory {
  static createUsecase() {
    return new CreateUsecase(new Repository());
  }

  static findAllUsecase() {
    return new FindAllUsecase(new Repository());
  }

  static findByIdUsecase() {
    return new FindByIdUsecase(new Repository());
  }
}
