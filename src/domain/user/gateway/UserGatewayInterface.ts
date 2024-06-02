import UserEntity from "../entity/UserEntity";

import type BaseGatewayInterface from "../../@shared/gateway/BaseGatewayInterface";

export default interface UserGatewayInterface
  extends BaseGatewayInterface<UserEntity> {
  login(login: string): Promise<UserEntity>;
}
