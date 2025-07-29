import { Request, Response } from 'express'

export const registerUser = async (req: Request, res: Response) => {  
  try {
    const data = '';
    res.status(201).json({ data });
  } catch (error) {
    res.status(400).json({ message: 'Ha ocurrido un error', error });
  }
};