import mongoose from 'mongoose';
import signale from 'signale';
import databaseConfig from "../../config/databaseConfig.json" assert { type: "json" };

const { connection_url } = databaseConfig;

let isConnected = false;

mongoose.connection.on('connected', () => {
    isConnected = true;
    signale.success("Connected to the database");
});

mongoose.connection.on('disconnected', () => {
    isConnected = false;
    signale.warn("Disconnected from the database");
});

mongoose.connection.on('reconnected', () => {
    isConnected = true;
    signale.success("Reconnected to the database");
});

export async function connect() {
    if (isConnected) {
        return;
    }

    await mongoose.connect(connection_url, {
        serverSelectionTimeoutMS: 2000,
    });
}

export async function disconnect() {
    if (!isConnected) {
        return;
    }

    await mongoose.disconnect();
}