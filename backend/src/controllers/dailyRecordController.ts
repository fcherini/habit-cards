import { Request, Response } from "express";
import DailyRecord, { IDailyRecord } from "../models/DailyRecord";

interface DailyRecordFilters {
  goalId?: string;
  date?: string;
  score?: string;
}

export const createDailyRecord = async (
  req: Request<{}, {}, IDailyRecord>,
  res: Response
): Promise<void> => {
  const { goalId, date, score } = req.body;

  try {
    const newRecord: IDailyRecord = new DailyRecord({ goalId, date, score });
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

//TODO: add user validation
export const lisDailyRecords = async (
  req: Request<{}, {}, {}, DailyRecordFilters>,
  res: Response
): Promise<void> => {
  try {
    const { goalId, date, score } = req.query;

    const filter: any = {};
    if (goalId) filter.goalId = goalId;
    if (date) filter.date = new Date(date as string);
    if (score) filter.score = parseInt(score as string, 10);

    const records = await DailyRecord.find(filter);
    if (!records.length) {
      res.status(404).json({ error: "Record not found" });
    } else {
      res.status(200).json(records);
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

//TODO apply filters to get
export const getDailyRecord = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const goal = await DailyRecord.findById(req.params.id);
    if (!goal) {
      res.status(404).json({ error: "Record not found" });
    } else {
      res.status(200).json(goal);
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const updateDailyRecord = async (
  req: Request<{ id: string }, {}, Partial<Omit<IDailyRecord, "goalId">>>,
  res: Response
): Promise<void> => {
  const { date, score } = req.body;
  //TODO better way to patch each field
  try {
    const goal = await DailyRecord.findById(req.params.id);
    if (!goal) {
      res.status(404).json({ error: "Record not found" });
    } else {
      if (date) {
        goal.date = date;
      }
      if (score) {
        goal.score = score;
      }
      await goal.save();
      res.status(200).json(goal);
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteDailyRecord = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  //TODO make it so it's just not active?

  try {
    const record = await DailyRecord.findById(req.params.id);
    if (!record) {
      res.status(404).json({ error: "Record not found" });
    } else {
      await record.deleteOne();
      res.status(200).json({ message: "Record deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
