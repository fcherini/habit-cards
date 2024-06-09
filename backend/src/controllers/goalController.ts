import { Request, Response } from "express";
import Goal, { IGoal } from "../models/Goal";

export const createGoal = async (
  req: Request<{}, {}, IGoal>,
  res: Response
): Promise<void> => {
  const { title, rank } = req.body;

  try {
    const newHabit: IGoal = new Goal({ title, rank });
    await newHabit.save();
    res.status(201).json(newHabit);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
//TODO: see if possible to combine list and get
export const listGoals = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const goals = await Goal.find();
    if (!goals.length) {
      res.status(404).json({ error: "Goal not found" });
    } else {
      res.status(200).json(goals);
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getGoal = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      res.status(404).json({ error: "Goal not found" });
    } else {
      res.status(200).json(goal);
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const updateGoal = async (
  req: Request<{ id: string }, {}, Partial<IGoal>>,
  res: Response
): Promise<void> => {
  const { title, rank, status } = req.body;
  //TODO better way to patch each field
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      res.status(404).json({ error: "Goal not found" });
    } else {
      if (title) {
        goal.title = title;
      }
      if (rank) {
        goal.rank = rank;
      }
      if (status) {
        goal.status = status;
      }
      await goal.save();
      res.status(200).json(goal);
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteGoal = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  //TODO make it so it's just not active?

  try {
    const habit = await Goal.findById(req.params.id);
    if (!habit) {
      res.status(404).json({ error: "Goal not found" });
    } else {
      await habit.deleteOne();
      res.status(200).json({ message: "Goal deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
