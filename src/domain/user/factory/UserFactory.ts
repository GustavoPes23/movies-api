import CreateUsecase from "../usecase/create/UserCreateUseCase";
import FindAllUsecase from "../usecase/findAll/UserFindAllUseCase";
import FindByIdUsecase from "../usecase/findById/UserFindByIdUseCase";
import Repository from "../../../infrastructure/user/repository/mongodb/UserRepositoryMondodb";
import UserUpdateUsecase from "../usecase/update/UserUpdateUseCase";
import UserLoginUseCase from "../usecase/login/UserLoginUseCase";
import PasswordEntity from "../../password/entity/PasswordEntity";
import TokenEntity from "../../token/entity/TokenEntity";

import { getSecretKey } from "../../../utils/config";

export default class UserFactory {
  public static createUsecase(): CreateUsecase {
    return new CreateUsecase(new Repository(), new PasswordEntity());
  }

  public static findAllUsecase(): FindAllUsecase {
    return new FindAllUsecase(new Repository());
  }

  public static findByIdUsecase(): FindByIdUsecase {
    return new FindByIdUsecase(
      new Repository(),
      new TokenEntity(getSecretKey())
    );
  }

  public static updateUsecase(): UserUpdateUsecase {
    return new UserUpdateUsecase(new Repository());
  }

  public static loginUsecase(): UserLoginUseCase {
    return new UserLoginUseCase(new Repository());
  }

  public static getPasswordEntity(
    password: string,
    saltRounds: string
  ): PasswordEntity {
    const passwordEntity = new PasswordEntity();
    passwordEntity.changePassword(password);
    passwordEntity.changeSaltRounds(saltRounds);

    return passwordEntity;
  }
}
