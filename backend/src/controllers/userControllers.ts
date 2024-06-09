import { Request, Response } from "express";
import User, { IUser } from "../models/User";

export const createUser = async (
  req: Request<{}, {}, IUser>,
  res: Response
): Promise<void> => {
  const { email, username, password, role } = req.body;

  try {
    const newUser: IUser = new User({ email, username, password, role });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
//TODO: permission only to admin
export const listUsers = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.find();
    if (!users.length) {
      res.status(404).json({ error: "Users not found" });
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getUser = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { email, username, password, role } = req.body;
  //TODO add permission block
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      if (email) {
        user.email = email;
      }
      if (username) {
        user.username = username;
      }
      await user.save();
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      await user.deleteOne();
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
