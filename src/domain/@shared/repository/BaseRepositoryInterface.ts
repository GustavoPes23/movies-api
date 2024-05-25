export default interface BaseRepositoryInterface<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
}
