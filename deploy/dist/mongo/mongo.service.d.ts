import { MongoClient } from 'mongodb';
export declare class MongoService {
    private readonly uri;
    private client;
    constructor(uri: string);
    connect(): Promise<void>;
    getClient(): MongoClient;
}
