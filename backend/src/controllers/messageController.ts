import { Request, Response } from 'express';
import Message from '../models/Message.js';

export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createMessage = async (req: Request, res: Response) => {
  const message = new Message(req.body);
  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};