import { Table, Model, PrimaryKey, Column } from "sequelize-typescript";

@Table({
  tableName: "users",
  timestamps: false,
})
export default class UserModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare login: string;

  @Column({ allowNull: false })
  declare password: number;

  @Column({ allowNull: false })
  declare createdAt: string;

  @Column({ allowNull: true })
  declare updatedAt: string;
}
