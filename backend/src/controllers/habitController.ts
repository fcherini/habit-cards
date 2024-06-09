import { Request, Response } from "express";
import Habit, { IHabit } from "../models/HabitModel";

export const createHabit = async (
  req: Request<{}, {}, IHabit>,
  res: Response
): Promise<void> => {
  const { title, rank } = req.body;

  try {
    // await Habit.create({title, rank}).then(()=>{}).catch(err=>{});
    const newHabit: IHabit = new Habit({ title, rank });
    await newHabit.save();
    res.status(201).json(newHabit);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getHabit = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      res.status(404).json({ error: "Habit card not found" });
    } else {
      res.status(200).json(habit);
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
