import dotenv from "dotenv";

import { MongoClient, ObjectId } from "mongodb";

dotenv.config();

export default class RepositoryMongoDb {
    constructor(private colletion: string) { }

    private async connect() {
        const client = new MongoClient(process.env.MONGO_URI!);
        await client.connect();
        return client.db(process.env.MONGO_DATABASE);
    }

    private getIdToDb(id: string): ObjectId {
        return new ObjectId(id);
    }

    public async create<T>(entity: T) {
        const db = await this.connect();
        return await db.collection(this.colletion).insertOne(entity);
    }

    public async findAll() {
        const db = await this.connect();
        return await db.collection(this.colletion).find().toArray();
    }

    public async findById(id: string) {
        const db = await this.connect();
        return await db
            .collection(this.colletion)
            .findOne({ _id: this.getIdToDb(id) });
    }

    public async update<T>(entity: T, id: string) {
        const db = await this.connect();
        return await db
            .collection(this.colletion)
            .updateOne({ _id: this.getIdToDb(id) }, { $set: entity });
    }
}
