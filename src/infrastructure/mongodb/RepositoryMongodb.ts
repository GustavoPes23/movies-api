import { config as dotenv } from "dotenv";

import { Db, MongoClient, ObjectId } from "mongodb";

dotenv();

export default class RepositoryMongoDb {
    private client: Promise<Db>;

    constructor(private colletion: string) {
        this.client = this.connect();
    }

    private async connect() {
        const client = new MongoClient(process.env.MONGO_URI!);
        return client.db(process.env.MONGO_DATABASE);
    }

    private getIdToDb(id: string): ObjectId {
        return new ObjectId(id);
    }

    public async create<T>(entity: T) {
        const db = await this.client;
        return await db.collection(this.colletion).insertOne(entity);
    }

    public async findAll() {
        const db = await this.client;
        return await db.collection(this.colletion).find().toArray();
    }

    public async findById(id: string) {
        const db = await this.client;
        return await db
            .collection(this.colletion)
            .findOne({ _id: this.getIdToDb(id) });
    }

    public async findByLogin(login: string) {
        const db = await this.client;
        return await db
            .collection(this.colletion)
            .findOne({ login });
    }

    public async update<T>(entity: T, id: string) {
        const db = await this.client;
        return await db
            .collection(this.colletion)
            .updateOne({ _id: this.getIdToDb(id) }, { $set: entity });
    }
}
