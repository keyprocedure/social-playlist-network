import User from "../models/User"; // Adjust the path as necessary
import signale from "signale";
import { connect, disconnect } from "../database";

// Assuming this is in a context where createUser makes sense
export const createUser = async (userObject) => {
    try {
        await connect();
        const newUser = new User({
            email:userObject.email,
            username: userObject.username,
            password: userObject.password,
            birthday: userObject.birthday,
        });
        await newUser.save();
        signale.success("User Created");

        await disconnect();
    } catch (error) {
        throw error;
    }
};