import mongoose from 'mongoose';
import signale from 'signale';
import databaseConfig from "../../config/databaseConfig.json" assert { type: "json" };

const { connection_url } = databaseConfig;

export async function connect() {
    try {
        await mongoose.connect(connection_url, {
            serverSelectionTimeoutMS: 2000,
        });
        signale.success("Connected to the database");
    } catch (error) {
        throw error;
    }
}

export async function disconnect() {
    try {
        await mongoose.disconnect();
        signale.success("Disconnected from the database");
    } catch (error) {
        throw error;
    }
}