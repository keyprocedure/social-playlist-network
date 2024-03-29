// helpers/database/controllers/userController.js
import bcrypt from 'bcrypt'; 
import User from '../models/user.js';
import signale from 'signale';
import { connect, disconnect } from '../database.js';

export const createUser = async (userObject) => {
  try {
      await connect();
      const hashedPassword = await bcrypt.hash(userObject.password, 10);

      const newUser = new User({
          email: userObject.email,
          username: userObject.username,
          password: hashedPassword,
          birthday: userObject.birthday,
      });

      await newUser.save();
      signale.success("User Created");
      await disconnect();
  } catch (error) {
      signale.error("Error Creating User:", error);
      throw error;
  }
};

export const findUser = async (username, password) => {
  try {
      await connect();
      const user = await User.findOne({ username });
      if (!user) {
          throw new Error('No user found with this username');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
          throw new Error('Incorrect password');
      }

      await disconnect();
      return user; 
  } catch (error) {
      signale.error("Authentication Error:", error);
      throw error;
  }
};